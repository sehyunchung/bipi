import { useBpmCounter } from "../lib/bpm";

export default function Bpm() {
  const { bpm, tap } = useBpmCounter();

  return (
    <button
      className="text-[25vw] w-full h-full font-bold text-black bg-white dark:text-white dark:bg-black"
      onClick={() => {
        tap();
      }}
    >
      {bpm}
    </button>
  );
}
