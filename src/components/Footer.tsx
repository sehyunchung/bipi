import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import {
  BPM_SECONDARY_TEXT_COLOR,
  FONT_FAMILY,
  FOOTER_TEXT_COLOR,
} from "../constants";

const footerStyle = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    color: FOOTER_TEXT_COLOR,
  },
});

export default function Footer() {
  return (
    <View style={footerStyle.footer}>
      <Pressable
        onPress={(e) => {
          console.log(e);
        }}
      >
        <Text>made with ♥ by sehyunchung</Text>
      </Pressable>
    </View>
  );
}
