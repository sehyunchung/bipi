import React, { useState } from 'react'
import { Bpm } from './core/tapper'

const useBpm = () => {
  const bipi = new Bpm()
  const [bpm, setBpm] = useState(0)

  const tap = () => {
    bipi.tap()
    if (bipi.bpm) setBpm(bipi.bpm)
  }

  return { bpm, tap }
}

const Tapper: React.FC = () => {
  const { bpm, tap } = useBpm()

  return (
    <div className="tapper">
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
      <Tapper />
    </div>
  )
}

export default App
