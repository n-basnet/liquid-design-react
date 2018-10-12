import styled from 'styled-components'

export default styled.ul`
  font-size: 18px;
  li {
    line-height: 1.75;
    ul {
      margin: 0;
      padding: 0 0 0 10px;
      list-style-type: none;
      li {
        text-indent: -10px;
        &:before {
          content: '-';
          text-indent: -20px;
          padding-right: 15px;
        }
        ul > li {
          text-indent: 0px;
        }
      }
    }
  }
`
