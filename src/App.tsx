import React, { useState } from 'react'
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

const Bpm: React.FC = () => {
  const { bpm, tap } = useBpm()

  return (
    <div className="bpm">
      <div>{bpm}</div>
      <button onClick={tap}>tap!</button>
    </div>
  )
}

const Header = () => <h1>Bipi!</h1>

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Bpm />
    </div>
  )
}

export default App
