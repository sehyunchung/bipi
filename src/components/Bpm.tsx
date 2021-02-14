import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, ViewProps } from "react-native";
import { useSpring, animated } from "react-spring/native";

import { useAtom } from "jotai";
import GestureRecognizer from "react-native-swipe-gestures";

import {
  Tapper,
  BPM_PRIMARY_TEXT_COLOR,
  BPM_SECONDARY_TEXT_COLOR,
  FONT_FAMILY,
  BPM_TIMEOUT,
  dimensionsAtom,
} from "../internal";

const AnimatedView = animated<React.ElementType<ViewProps>>(View);

const tapper = new Tapper();

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
  const [on, toggle] = useState(false);
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

  const animation = useSpring({
    opacity: on ? 0 : 1,
    config: {
      tension: 500,
    },
  });

  const handleClick = () => {
    tap();
  };

  useEffect(() => {
    const id = setTimeout(() => {
      resetBpm();
    }, BPM_TIMEOUT);

    return () => {
      clearTimeout(id);
    };
  }, [bpm, resetBpm]);

  const decimal = Math.floor((bpm - Math.floor(bpm)) * 10);

  return (
    <GestureRecognizer onSwipe={() => resetBpm()}>
      <Pressable
        onPress={handleClick}
        onPressIn={() => {
          toggle(true);
        }}
        onPressOut={() => {
          toggle(false);
        }}
      >
        <AnimatedView style={animation}>
          <View style={bpmStyle.bpm}>
            <Text style={bpmStyle.bpmText} selectable={false}>
              {Math.floor(bpm)}
              {bpm ? <Text style={bpmStyle.decimal}>.{decimal}</Text> : ""}
            </Text>
          </View>
        </AnimatedView>
      </Pressable>
    </GestureRecognizer>
  );
}
