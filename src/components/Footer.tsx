/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { BPM_SECONDARY_TEXT_COLOR, FONT_FAMILY, FOOTER_TEXT_COLOR } from '../constants'

const footerStyle = css`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-family: ${FONT_FAMILY};
  font-size: 0.8rem;
  color: ${FOOTER_TEXT_COLOR};
  a {
    color: ${FOOTER_TEXT_COLOR};
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${BPM_SECONDARY_TEXT_COLOR};
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
