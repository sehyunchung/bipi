import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, ViewProps } from "react-native";
import { useSpring, animated } from "react-spring";
import { useAtom } from "jotai";
import GestureRecognizer from "react-native-swipe-gestures";

console.log(GestureRecognizer);

import {
  Tapper,
  BPM_PRIMARY_TEXT_COLOR,
  BPM_SECONDARY_TEXT_COLOR,
  FONT_FAMILY,
  BPM_TIMEOUT,
  dimensionsAtom,
} from "../internal";

const AnimatedView = animated<React.ElementType<ViewProps>>(View);

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
  const [dimension] = useAtom(dimensionsAtom);

  const bpmStyle = useMemo(() => {
    const { width, height } = dimension;

    return StyleSheet.create({
      bpm: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
        textAlign: "center",
      },
      bpmText: {
        fontSize: (width - 20) / 5,
        fontFamily: FONT_FAMILY,
        color: BPM_PRIMARY_TEXT_COLOR,
      },
      decimal: {
        color: BPM_SECONDARY_TEXT_COLOR,
      },
    });
  }, [dimension]);

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
    <GestureRecognizer onSwipe={() => resetBpm()}>
      <Pressable onPress={handleClick}>
        <View style={bpmStyle.bpm}>
          <AnimatedView style={animated.bpm}>
            <Text style={bpmStyle.bpmText} selectable={false}>
              {Math.floor(bpm)}
              {bpm ? <Text style={bpmStyle.decimal}>.{decimal}</Text> : ""}
            </Text>
          </AnimatedView>
        </View>
      </Pressable>
    </GestureRecognizer>
  );
}
