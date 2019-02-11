import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { TypingAnimation } from "react-native-typing-animation";

import { Constants } from "expo";
import io from "socket.io-client";
import { Address } from "./address";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.user = require("chance")
      .Chance()
      .first();
  }

  state = {
    msg: "",
    recivedMsg: [],
    isTyping: false
  };

  componentDidMount() {
    this.socket = io(Address);
    this.socket.on("chat message", msg => {
      this.setState(prevState => ({
        recivedMsg: [msg, ...prevState.recivedMsg]
      }));
    });

    this.socket.on("typing", msg => {
      this.setState({
        isTyping: msg
      });
    });
  }

  handleTextInput = text => {
    this.setState({ msg: text });
    text ? this.socket.emit("typing", true) : this.socket.emit("typing", false);
  };

  sendMessage = () => {
    this.socket.emit("chat message", {
      user: this.user,
      msg: this.state.msg
    });
    this.socket.emit("typing", false);
    this.setState({ msg: "" });
  };

  showTyping = () =>
    this.state.isTyping ? (
      <TypingAnimation
        style={{ padding: 10, margin: 10 }}
        dotColor="#B2DFDB"
        dotMargin={8}
        dotAmplitude={5}
        dotRadius={7}
        dotX={17}
        dotY={6}
      />
    ) : null;

  renderItem = ({ item }) =>
    item.user === this.user ? (
      <View style={[styles.ownMessage, styles.list]}>
        <Text style={styles.body}>
          <Text style={styles.sender}>{item.user}: </Text>
          {item.msg}
        </Text>
      </View>
    ) : (
      <View style={[styles.list, styles.receivedMessage]}>
        <Text style={styles.body}>
          <Text style={styles.receiver}>{item.user}: </Text>
          {item.msg}
        </Text>
      </View>
    );

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.subBontainer}>
          <TextInput
            placeholder={`${this.user} type something cool`}
            value={this.state.msg}
            style={styles.input}
            multiline
            autoFocus
            onChangeText={this.handleTextInput}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.sendMessage}
            disabled={this.state.msg ? false : true}
          >
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
        {this.showTyping()}
        <FlatList
          data={this.state.recivedMsg}
          renderItem={this.renderItem}
          inverted
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: Constants.statusBarHeight,
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "#FAFAFA",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  subBontainer: {
    flexDirection: "row"
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    width: "80%"
  },
  button: {
    height: 50,
    width: "20%",
    backgroundColor: "#B2DFDB",
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    borderRadius: 15,
    marginBottom: 10
    // width: "50%"
  },
  body: {
    fontSize: 15,
    padding: 10
  },
  receiver: {
    color: "red"
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ecf0f1",
    marginRight: 60
  },
  ownMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#b3e5fc",
    marginLeft: 60
  },
  sender: {
    color: "#4527a0"
  }
});
