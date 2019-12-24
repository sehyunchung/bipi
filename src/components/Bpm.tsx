/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { useSpring, animated, interpolate } from 'react-spring'
import { Tapper } from '../core/tapper'
import { STYLE, TAPPER } from '../constants'

const bpmStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 50vw;
  text-align: center;
  font-family: ${STYLE.FONT.FAMILY};
  color: ${STYLE.COLOR.BPM_TEXT};
`
const tapper = new Tapper()

const useTapper = () => {
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
    }, TAPPER.TIME_OUT)
    return () => {
      clearTimeout(id)
    }
  }, [bpm, reset])

  const props = useSpring({ number: bpm })

  return (
    <div css={bpmStyle} onClick={tap}>
      <animated.span>
        {props.number.interpolate(num => num.toFixed(0))}
      </animated.span>
    </div>
  )
}

export default Bpm
