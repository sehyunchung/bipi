/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { STYLE } from '../constants'

const footerStyle = css`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-family: ${STYLE.FONT.FAMILY};
  font-size: 0.8rem;
  color: ${STYLE.COLOR.FOOTER_TEXT};
  a {
    color: ${STYLE.COLOR.FOOTER_TEXT};
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${STYLE.COLOR.BPM_SECONDARY_TEXT};
    }
  }
`
export default function Footer() {
  return (
    <footer css={footerStyle}>
      <a
        href="https://github.com/sehyunchung/bipi"
        target="_blank"
        rel="noopener noreferrer"
      >
        made with ♥ by sehyunchung
      </a>
    </footer>
  )
}
