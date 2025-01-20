import "./App.css";
import { Hotkeys } from "../lib/main";
import ReactHotkeys from "react-hot-keys";

function App() {
  return (
    <>
      <Hotkeys
        keyName="ctrl+a"
        onKeyDown={() => console.log("ctrl+a onKeyDown")}
        onKeyUp={() => console.log("ctrl+a onKeyUp")}
        onKeyRepeat={() => console.log("ctrl+a onKeyRepeat")}
      >
        ctrl+a
      </Hotkeys>
      <ReactHotkeys
        keyName="ctrl+b"
        onKeyDown={() => console.log("ctrl+b onKeyDown")}
        onKeyUp={() => console.log("ctrl+b onKeyUp")}
        // onKeyRepeat={() => console.log("ctrl+a1")}
      >
        ctrl+b
      </ReactHotkeys>
    </>
  );
}

export default App;
