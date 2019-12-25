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
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 50vw;
  text-align: center;
  font-family: ${STYLE.FONT.FAMILY};
  color: ${STYLE.COLOR.BPM_TEXT};
`
const tapper = new Tapper(5)

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
    config: { duration: 100 },
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
      <animated.span
        style={{
          transform: x
            .interpolate({
              range: [0, 0.5, 1],
              output: [1, 0.8, 1],
            })
            .interpolate(x => `scale(${x})`),
        }}
      >
        {bpm}
      </animated.span>
    </div>
  )
}

export default Bpm
