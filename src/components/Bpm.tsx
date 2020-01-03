/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { useSpring, animated } from 'react-spring'
import { Tapper } from '../core/tapper'
import { STYLE, TAPPER } from '../constants'

const bpmStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  user-select: none;
  text-align: center;
`
const bpmTextStyle = css`
  font-size: 40vw;
  font-weight: 500;
  font-family: ${STYLE.FONT.FAMILY};
  color: ${STYLE.COLOR.BPM_PRIMARY_TEXT};
  margin-top: -4.4vh;
  display: block;
`

const bpmDecimalTextStyle = css`
  margin-left: -3.2vw;
  padding-right: 2vw;
  font-weight: 400;
  font-size: 0.5em;
  letter-spacing: -2.4vw;
  color: ${STYLE.COLOR.BPM_SECONDARY_TEXT};
`

const tapper = Tapper.new()

const useTapper = () => {
  const [bpm, setBpm] = useState(0)

  const tap = () => {
    tapper.tap()
    if (tapper.bpm) setBpm(tapper.bpm)
  }

  const resetBpm = () => {
    tapper.reset()
    setBpm(tapper.bpm)
  }

  return { bpm, tap, resetBpm }
}

const Bpm: React.FC = () => {
  const { bpm, tap, resetBpm } = useTapper()
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
      resetBpm()
      toggle(on => !on)
    }, TAPPER.TIME_OUT)
    return () => {
      clearTimeout(id)
    }
  }, [bpm, resetBpm])

  const decimal = Math.floor((bpm - Math.floor(bpm)) * 10)

  return (
    <div css={bpmStyle} onClick={handleClick}>
      <animated.div
        style={{
          transform: x
            .interpolate({
              range: [0, 0.5, 1],
              output: [1, 1.1, 1],
            })
            .interpolate(x => `scale(${x})`),
        }}
      >
        <span css={bpmTextStyle}>
          {Math.floor(bpm)}
          {bpm ? <span css={bpmDecimalTextStyle}>.{decimal}</span> : ''}
        </span>
      </animated.div>
    </div>
  )
}

export default Bpm
