/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FONT_FAMILY, HEADER_TEXT_COLOR } from '../constants'

const headerStyle = css`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${FONT_FAMILY};
  font-size: 2rem;
  letter-spacing: -0.5rem;
  color: ${HEADER_TEXT_COLOR};
`
export default function Header() {
  return <h1 css={headerStyle}>Bipi!</h1>
}
