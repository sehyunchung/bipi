/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { STYLE } from '../constants'

const headerStyle = css`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${STYLE.FONT.FAMILY};
  font-size: 2rem;
  letter-spacing: -0.5rem;
  color: ${STYLE.COLOR.HEADER_TEXT};
`
export default function Header() {
  return <h1 css={headerStyle}>Bipi!</h1>
}
