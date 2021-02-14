import React, { useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, ScaledSize } from "react-native";
import { Provider, useAtom } from "jotai";

import Header from "./components/Header";
import Bpm from "./components/Bpm";
import Footer from "./components/Footer";

import { BACKGROUND_COLOR, dimensionsAtom } from "./internal";

function Bipi() {
  const [dimensions, setDimensions] = useAtom(dimensionsAtom);

  const appStyle = StyleSheet.create({
    app: {
      position: "absolute",
      height: dimensions.height,
      backgroundColor: BACKGROUND_COLOR,
    },
  });

  useLayoutEffect(() => {
    const { width, height } = Dimensions.get("window");
    setDimensions(() => ({ width, height }));

    const listener = ({ window }: { window: ScaledSize }) => {
      setDimensions(() => ({ height: window.height, width: window.width }));
    };
    Dimensions.addEventListener("change", listener);

    return () => {
      Dimensions.removeEventListener("change", listener);
    };
  }, []);

  return (
    <View style={appStyle.app}>
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
