hotkeys-react
===
[![npm package](https://img.shields.io/npm/v/hotkeys-react.svg)](https://www.npmjs.org/package/hotkeys-react)

## 说明
本仓库由[`https://github.com/jaywcjlove/react-hotkeys`](https://github.com/jaywcjlove/react-hotkeys)改进而来，因为原来仓库在react19.0会存在类型问题。由此我想重新改写一遍。

<!--dividing-->

React component to listen to keydown and keyup keyboard events, defining and  dispatching keyboard shortcuts. Uses a fork of [hotkeys.js](https://github.com/jaywcjlove/hotkeys) for keydown detection of special characters. You give it a keymap of shortcuts & it bind it to the mousetrap singleton. The, it'll unbind it when the component unmounts.


## Example

### Install

```sh
npm i -S hotkey-react
```

### Demo

Preview [demo](https://jaywcjlove.github.io/react-hotkeys/). 

- [Codepen example](https://codepen.io/jaywcjlove/pen/bJxbwG?editors=0010).
- [CodesandBox Example](https://codesandbox.io/s/hotkeys-116-8rge8)

```js
import React from 'react';
import { Hotkeys } from 'hotkeys-react';

export function HotkeysDemo() {
  const [output, setOutput] = useState("Hello, I am a component that listens keydown and keyup of a")
  const handleKeyUp = (keyName, e, handle) {
    console.log("test:onKeyUp", e, handle)
    setOutput(`onKeyUp ${keyName}`)
  }
  const handleKeyDown(keyName, e, handle) {
    console.log("test:onKeyDown", keyName, e, handle)
    setOutput(`onKeyDown ${keyName}`)
  }

  return (
      <Hotkeys 
        keyName="shift+a,alt+s" 
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <div style={{ padding: "50px" }}>
          {output}
        </div>
      </Hotkeys>
  )
}

```
## API 

### keyName

Supported keys `⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, `⌘` .

`⌘` Command()  
`⌃` Control  
`⌥` Option(alt)  
`⇧` Shift  
`⇪` Caps Lock   
~~`fn` Function key is `fn` (not supported)~~  
`↩︎` return/enter
`space` space keys

### onKeyDown

Callback function to be called when user pressed the target buttons
`space` space keys

### onKeyUp

Callback function to be called when user key uped the target buttons

### allowRepeat

> allowRepeat?: boolean;

`allowRepeat` to allow auto repeating key down


### disabled

> disabled?: boolean;

Disable `onKeyDown` and `onKeyUp` events. Default: `undefined`

### filter

`INPUT` `SELECT` `TEXTAREA` default does not handle. `filter` to return to the true shortcut keys set to play a role, flase shortcut keys set up failure.

```diff
 <Hotkeys 
   keyName="shift+a,alt+s" 
+   filter={(event) => {
+     return true;
+   }}
   onKeyDown={handleKeyDown}
   onKeyUp={handleKeyUp}
 />
```


## License

Licensed under the MIT License.