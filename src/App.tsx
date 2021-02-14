import React from "react";
import { View, StyleSheet, Dimensions, LayoutChangeEvent } from "react-native";
import { Provider, useAtom } from "jotai";

import Header from "./components/Header";
import Bpm from "./components/Bpm";
import Footer from "./components/Footer";

import { BACKGROUND_COLOR, dimensionsAtom } from "./internal";

const appStyle = StyleSheet.create({
  app: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: BACKGROUND_COLOR,
  },
});

function Bipi() {
  const [, setDimensions] = useAtom(dimensionsAtom);
  const handleLayout = (e: LayoutChangeEvent) => {
    const {
      nativeEvent: {
        layout: { width, height },
      },
    } = e;
    setDimensions({ width, height });
  };

  return (
    <View style={appStyle.app} onLayout={handleLayout}>
      <Header />
      <Bpm />
      <Footer />
    </View>
  );
}

export default function App() {
  return (
    <Provider>
      <Bipi />
    </Provider>
  );
}
