export type BpmCounterSettings = {
  theme: "light" | "dark" | "system";
  resetTimer: boolean;
  resetTimerInterval: number;
  decimal: 0 | 1 | 2;
  minimumCount: 0 | 2 | 4;
  halfBeat: boolean;
};

export const initialSettings: BpmCounterSettings = {
  theme: "system",
  resetTimer: true,
  resetTimerInterval: 3000,
  decimal: 2,
  minimumCount: 4,
  halfBeat: false,
};
