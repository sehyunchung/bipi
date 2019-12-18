/** @jsx jsx */
import React, { useState } from 'react'
import { Global, css, jsx } from '@emotion/core'

import { Tapper } from './core/tapper'

const useBpm = () => {
  const tapper = new Tapper()
  const [bpm, setBpm] = useState(0)

  const tap = () => {
    tapper.tap()
    if (tapper.bpm) setBpm(tapper.bpm)
  }

  return { bpm, tap }
}

const globalStyle = css`
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
`
const appStyle = css`
  height: 100vh;
  width: 100vw;
  background-color: #afafaf;
`

const bpmStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  user-select: none;
  font-size: 50vw;
  font-family: Menlo, Fira Code, Inconsolata, Monaco, Consolas, 'Courier New',
    Courier, monospace;
  text-align: center;
  color: #ffffff;
`

const Bpm: React.FC = () => {
  const { bpm, tap } = useBpm()

  return (
    <div css={bpmStyle} onClick={tap}>
      {bpm}
    </div>
  )
}

const App: React.FC = () => {
  return (
    <div css={appStyle} className="App">
      <Global styles={globalStyle} />
      <Bpm />
    </div>
  )
}

export default App
