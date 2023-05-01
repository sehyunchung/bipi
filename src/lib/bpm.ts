import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { settingsAtom } from "./settings";

export class BpmCounter {
  private lastBeatTime: number;
  private bpm: number;

  constructor() {
    this.lastBeatTime = 0;
    this.bpm = 0;
  }

  public beat() {
    const time = Date.now();
    const elapsed = time - this.lastBeatTime;

    if (elapsed > 0) {
      const beatsPerMillis = 1.0 / (elapsed / 60000.0);
      this.bpm = beatsPerMillis;
    }

    this.lastBeatTime = time;
  }

  public getBpm() {
    return this.bpm;
  }

  public reset() {
    this.lastBeatTime = 0;
    this.bpm = 0;
  }
}

const bpmCounter = new BpmCounter();

export const useBpmCounter = () => {
  const [bpm, setBpm] = useState(0);
  const { resetTimer, resetTimerIntervalAsSec, halfBeat, decimal } =
    useAtomValue(settingsAtom);

  const tap = () => {
    bpmCounter.beat();

    const baseBpm = bpmCounter.getBpm();

    if (baseBpm) {
      const decimaledBpm = Math.round(baseBpm * 10 ** decimal) / 10 ** decimal;
      const bpm = halfBeat ? decimaledBpm * 2 : decimaledBpm;
      setBpm(bpm);
    }
  };

  const reset = useCallback(() => {
    bpmCounter.reset();
    setBpm(0);
  }, []);

  useEffect(() => {
    const id = setTimeout(
      () => {
        reset();
      },
      resetTimer ? resetTimerIntervalAsSec * 1_000 : 0
    );

    return () => {
      clearTimeout(id);
    };
  }, [bpm, reset, resetTimer, resetTimerIntervalAsSec]);

  return { bpm, tap, reset };
};
