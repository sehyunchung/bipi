import { useBpmCounter } from "../lib/bpm";

export default function Bpm() {
  const { bpm, tap, reset } = useBpmCounter();

  return (
    <button
      className="text-[25vw] w-full h-full"
      onClick={() => {
        tap();
      }}
    >
      {bpm}
    </button>
  );
}
