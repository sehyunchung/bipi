/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { STYLE } from '../constants'

const headerStyle = css`
  position: absolute;
  top: 16p;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${STYLE.FONT.FAMILY};
  font-size: 4vw;
  letter-spacing: -1vw;
  color: ${STYLE.COLOR.HEADER_TEXT};
  a {
    color: ${STYLE.COLOR.HEADER_TEXT};
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${STYLE.COLOR.BPM_SECONDARY_TEXT};
    }
  }
`
export default function Header() {
  return <h1 css={headerStyle}>Bipi!</h1>
}
