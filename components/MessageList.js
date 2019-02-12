import React from "react";
import { FlatList } from "react-native";
import Row from "./Row";

const MessageList = props => (
  <FlatList
    data={props.message}
    renderItem={({ item }) => <Row {...item} sender={props.sender} />}
    inverted
  />
);

export default MessageList;
