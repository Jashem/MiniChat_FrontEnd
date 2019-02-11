import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const NewMessage = props => (
  <View style={styles.subBontainer}>
    <TextInput
      placeholder={`${props.user} type something cool`}
      value={props.message}
      style={styles.input}
      multiline
      autoFocus
      onChangeText={text => props.onChange(text)}
    />
    <TouchableOpacity
      style={styles.button}
      onPress={() => props.sendMessage(props.user, props.message)}
      disabled={props.message ? false : true}
    >
      <Text>Send</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
  }
});

export default NewMessage;
