import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Row = props =>
  props.user === props.sender ? (
    <View style={[styles.ownMessage, styles.list]}>
      <Text style={styles.body}>
        <Text style={styles.sender}>{props.user}: </Text>
        {props.msg}
      </Text>
    </View>
  ) : (
    <View style={[styles.list, styles.receivedMessage]}>
      <Text style={styles.body}>
        <Text style={styles.receiver}>{props.user}: </Text>
        {props.msg}
      </Text>
    </View>
  );

styles = StyleSheet.create({
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

export default Row;
