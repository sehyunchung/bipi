import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { FONT_FAMILY, FOOTER_TEXT_COLOR } from "../internal";

const footerStyle = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  text: {
    textAlign: "center",
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    color: FOOTER_TEXT_COLOR,
    letterSpacing: -0.5,
  },
});

export default function Footer() {
  return (
    <View style={footerStyle.view}>
      <Pressable
        onPress={(e) => {
          console.log(e);
        }}
      >
        <Text style={footerStyle.text} selectable={false}>
          ©{new Date().getFullYear()} pretty hard software
        </Text>
      </Pressable>
    </View>
  );
}
