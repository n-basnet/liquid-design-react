import { css } from 'styled-components'

// cherry-picking from https://meyerweb.com/eric/tools/css/reset/

export default css`
  blockquote,
  pre,
  a,
  img,
  q,
  strong,
  b,
  u,
  i,
  ol,
  ul,
  li,
  form,
  label {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
`
