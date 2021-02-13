import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONT_FAMILY, HEADER_TEXT_COLOR } from "../constants";

const style = StyleSheet.create({
  header: {
    position: "absolute",
    top: "0.5rem",
    left: "50%",
    fontFamily: FONT_FAMILY,
    fontSize: 32,
    letterSpacing: 0.5,
    color: HEADER_TEXT_COLOR,
  },
});

export default function Header() {
  return <Text style={style.header}>Bipi!</Text>;
}
