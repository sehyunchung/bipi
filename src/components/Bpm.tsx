/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { useSpring, animated } from 'react-spring'
import { Tapper } from '../core/tapper'
import { STYLE, TAPPER } from '../constants'

const bpmStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 45vw;
  font-weight: 500;
  text-align: center;
  font-family: ${STYLE.FONT.FAMILY};
  color: ${STYLE.COLOR.BPM_PRIMARY_TEXT};
`
const decimalBpmStyle = css`
  font-weight: 400;
  font-size: 4vw;
  color: ${STYLE.COLOR.BPM_SECONDARY_TEXT};
  position: absolute;
  bottom: 4vw;
  left: 50%;
  transform: translateX(-50%);
`

const tapper = Tapper.new()

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
  const [on, toggle] = useState(true)
  const { x } = useSpring({
    from: { x: 0 },
    x: on ? 1 : 0,
    config: { duration: 20 },
  })

  const handleClick = () => {
    tap()
    toggle(on => !on)
  }

  useEffect(() => {
    const id = setTimeout(() => {
      reset()
      toggle(on => !on)
    }, TAPPER.TIME_OUT)
    return () => {
      clearTimeout(id)
    }
  }, [bpm, reset])

  return (
    <div css={bpmStyle} onClick={handleClick}>
      <animated.div
        style={{
          transform: x
            .interpolate({
              range: [0, 0.5, 1],
              output: [1, 1.2, 1],
            })
            .interpolate(x => `scale(${x})`),
        }}
      >
        <span>{Math.round(bpm)}</span>
        <div css={decimalBpmStyle}>{bpm}</div>
      </animated.div>
    </div>
  )
}

export default Bpm
