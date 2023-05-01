import { atom } from "jotai";

export type BpmCounterSettings = {
  theme: "light" | "dark" | "system";
  resetTimer: boolean;
  resetTimerIntervalAsSec: number;
  decimal: 0 | 1 | 2;
  halfBeat: boolean;
};

export const initialSettings: BpmCounterSettings = {
  theme: "system",
  resetTimer: true,
  resetTimerIntervalAsSec: 3,
  decimal: 2,
  halfBeat: false,
};

export const settingsAtom = atom<BpmCounterSettings>(initialSettings);
