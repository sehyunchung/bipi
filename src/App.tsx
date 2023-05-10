import { useAtomValue } from "jotai";
import Bpm from "./components/BpmCounter";
import { Settings } from "./components/Settings";

import { themeAtom } from "./lib/theme";
import { cn } from "./lib/utils";

function App() {
  const theme = useAtomValue(themeAtom);

  console.log({ theme });

  return (
    <div
      className={cn(
        "relative flex flex-col w-screen h-screen font-mono bg-white text-black dark:text-white dark:bg-black",
        theme === "dark" ? "dark" : ""
      )}
    >
      <Bpm />
      <Settings />
    </div>
  );
}

export default App;
