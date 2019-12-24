/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { Tapper } from '../core/tapper'

const bpmStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 50vw;
  font-family: 'IBM Plex Mono', Menlo, Inconsolata, Monaco, Consolas,
    'Courier New', Courier, monospace;
  text-align: center;
  color: #ffffff;
`

const useTapper = () => {
  const tapper = new Tapper()
  const [bpm, setBpm] = useState(0)

  const tap = () => {
    tapper.tap()
    if (tapper.bpm) setBpm(tapper.bpm)
  }

  const reset = () => {
    tapper.reset()
    setBpm(tapper.bpm)
  }

  return { bpm, tap, reset }
}

const Bpm: React.FC = () => {
  const { bpm, tap, reset } = useTapper()

  useEffect(() => {
    const id = setTimeout(() => {
      reset()
    }, 3000)
    return () => {
      clearTimeout(id)
    }
  }, [bpm, reset])

  return (
    <div css={bpmStyle} onClick={tap}>
      <span>{bpm}</span>
    </div>
  )
}

export default Bpm
