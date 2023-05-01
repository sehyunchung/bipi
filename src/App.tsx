import Bpm from "./components/BpmCounter";
import { Settings } from "./components/Settings";

function App() {
  return (
    <div className="border-red-500">
      <Settings />
      <Bpm />
    </div>
  );
}

export default App;
