import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ViewProps } from "react-native";
import { useSpring, animated } from "react-spring";

import { Tapper } from "../core/tapper";

import {
  BPM_PRIMARY_TEXT_COLOR,
  BPM_SECONDARY_TEXT_COLOR,
  FONT_FAMILY,
  BPM_TIMEOUT,
} from "../constants";

const AnimatedView = animated<React.ElementType<ViewProps>>(View);

const bpmStyle = StyleSheet.create({
  bpm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  bpmText: {
    fontSize: 120,
    fontFamily: FONT_FAMILY,
    color: BPM_PRIMARY_TEXT_COLOR,
  },
  decimal: {
    color: BPM_SECONDARY_TEXT_COLOR,
  },
});

const tapper = Tapper.new();

const useTapper = () => {
  const [bpm, setBpm] = useState(0);

  const tap = () => {
    tapper.tap();
    if (tapper.bpm) setBpm(tapper.bpm);
  };

  const resetBpm = () => {
    tapper.reset();
    setBpm(tapper.bpm);
  };

  return { bpm, tap, resetBpm };
};

export default function Bpm() {
  const { bpm, tap, resetBpm } = useTapper();
  const [on, toggle] = useState(true);

  const { x } = useSpring<{ x: number }>({
    from: { x: 0 },
    x: on ? 1 : 0,
    config: { duration: 20 },
  });

  const animated = StyleSheet.create({
    bpm: {
      transform: [
        {
          scale: x
            .interpolate({
              range: [0, 0.5, 1],
              output: [1, 1.1, 1],
            })
            .interpolate((x) => x),
        },
      ],
    },
  });

  const handleClick = () => {
    tap();
    toggle((on) => !on);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      resetBpm();
      toggle((on) => !on);
    }, BPM_TIMEOUT);
    return () => {
      clearTimeout(id);
    };
  }, [bpm, resetBpm]);

  const decimal = Math.floor((bpm - Math.floor(bpm)) * 10);

  return (
    <Pressable onPress={handleClick}>
      <View style={bpmStyle.bpm}>
        <AnimatedView style={animated.bpm}>
          <Text style={bpmStyle.bpmText}>
            {Math.floor(bpm)}
            {bpm ? <Text style={bpmStyle.decimal}>.{decimal}</Text> : ""}
          </Text>
        </AnimatedView>
      </View>
    </Pressable>
  );
}
