import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { FONT_FAMILY, HEADER_TEXT_COLOR } from "../internal";

const style = StyleSheet.create({
  header: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    top: 10,
    left: 10,
    width: 200,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 24,
    letterSpacing: -8,
    color: HEADER_TEXT_COLOR,
  },
  exclamation: {
    fontFamily: FONT_FAMILY,
    fontSize: 24,
    letterSpacing: -8,
    color: HEADER_TEXT_COLOR,
    transform: [{ translateX: -7 }],
  },
});

export default function Header() {
  return (
    <View style={style.header}>
      <Text style={style.title}>Bipi</Text>
      <Text style={style.exclamation}>!</Text>
    </View>
  );
}
