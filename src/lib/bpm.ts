import { useCallback, useEffect, useState } from "react";

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
      this.bpm = Math.floor(beatsPerMillis * 100) / 100;
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

const BPM_TIMEOUT = 5000;
const bpmCounter = new BpmCounter();

export const useBpmCounter = () => {
  const [bpm, setBpm] = useState(0);

  const tap = () => {
    bpmCounter.beat();
    if (bpmCounter.getBpm()) setBpm(bpmCounter.getBpm());
  };

  const reset = useCallback(() => {
    bpmCounter.reset();
    setBpm(0);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      reset();
    }, BPM_TIMEOUT);

    return () => {
      clearTimeout(id);
    };
  }, [bpm, reset]);

  return { bpm, tap, reset };
};
