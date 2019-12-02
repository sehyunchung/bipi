import React, { useState } from 'react'
import { Bpm } from './core/tapper'

const bipi = new Bpm(5)

const App: React.FC = () => {
  const [bpm, setBpm] = useState(0)
  const tap = () => {
    bipi.tap()
    if (bipi.bpm) setBpm(bipi.bpm)
  }
  return (
    <div className="App">
      <div>{bpm}</div>
      <button onClick={tap}>tap!</button>
    </div>
  )
}

export default App
