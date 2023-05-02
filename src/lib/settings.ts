import { atom } from "jotai";

export type BpmCounterSettings = {
  theme: "light" | "dark" | "system";
  resetTimer: boolean;
  resetTimerIntervalAsSec: number;
  decimal: number;
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
