import Bpm from "./components/BpmCounter";
import { Settings } from "./components/Settings";

function App() {
  return (
    <div className="relative flex flex-col w-screen h-screen font-mono">
      <Bpm />
      <Settings />
    </div>
  );
}

export default App;
