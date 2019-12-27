/** @jsx jsx */
import React from 'react'
import { Global, css, jsx } from '@emotion/core'

import Bpm from './components/Bpm'
import Footer from './components/Footer'

import { STYLE } from './constants'

const globalStyle = css`
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    background-color: ${STYLE.COLOR.BACKGROUND};
  }
`

const appStyle = css`
  position: relative;
  height: 100vh;
  width: 100vw;
`

const App: React.FC = () => {
  return (
    <div css={appStyle} className="App">
      <Global styles={globalStyle} />
      <Bpm />
      <Footer />
    </div>
  )
}

export default App
