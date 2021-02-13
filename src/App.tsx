import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import Bpm from "./components/Bpm";
import Footer from "./components/Footer";

import { BACKGROUND_COLOR } from "./constants";

const appStyle = StyleSheet.create({
  app: {
    position: "relative",
    height: "100vh",
    width: "100vw",
  },
});

export default function App() {
  return (
    <View style={appStyle.app}>
      <Header />
      <Bpm />
      <Footer />
    </View>
  );
}
