/** @jsx jsx */
import React, { Fragment, useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { MobileView, BrowserView } from 'react-device-detect'
import { Tapper } from '../core/tapper'

const bpmStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;
  user-select: none;
  font-size: 50vw;
  font-family: 'IBM Plex Mono', Menlo, 'Fira Code', Inconsolata, Monaco,
    Consolas, 'Courier New', Courier, monospace;
  text-align: center;
  color: #ffffff;
  background: palegoldenrod;
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
  const tapper = useTapper()

  useEffect(() => {
    const id = setTimeout(() => {
      tapper.reset()
    }, 3000)
    return () => {
      clearTimeout(id)
    }
  }, [tapper.bpm])

  return (
    <Fragment>
      <MobileView>
        <div css={bpmStyle} onTouchEnd={tapper.tap}>
          {tapper.bpm}
        </div>
      </MobileView>
      <BrowserView>
        <div css={bpmStyle} onClick={tapper.tap}>
          {tapper.bpm}
        </div>
      </BrowserView>
    </Fragment>
  )
}

export default Bpm
