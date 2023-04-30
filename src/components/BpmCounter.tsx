/* eslint-disable react/react-in-jsx-scope */
import { useBpmCounter } from "../lib/bpm";

export default function Bpm() {
  const { bpm, tap, reset } = useBpmCounter();

  return (
    <button
      className="text-6xl w-full h-full"
      onClick={() => {
        tap();
      }}
    >
      {bpm}
    </button>
  );
}
