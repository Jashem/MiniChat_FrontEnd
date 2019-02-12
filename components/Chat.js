import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { TypingAnimation } from "react-native-typing-animation";

import { Constants } from "expo";
import io from "socket.io-client";
import { Address } from "../address";
import NewMessage from "./NewMessage";
import MessageList from "./MessageList";

export default class Chat extends React.Component {
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

  sendMessage = (user, msg) => {
    this.socket.emit("chat message", {
      user: user,
      msg: msg
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

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <NewMessage
          user={this.user}
          message={this.state.msg}
          onChange={this.handleTextInput}
          sendMessage={this.sendMessage}
        />
        {this.showTyping()}
        <MessageList message={this.state.recivedMsg} sender={this.user} />
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
  }
});
