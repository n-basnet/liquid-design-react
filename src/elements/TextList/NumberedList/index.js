import styled from 'styled-components'

export const NumberedList = styled.ol`
  font-size: 18px;
  padding-left: 20px;
  line-height: 1.75;
  list-style: none;
  counter-reset: item;
  li {
    counter-increment: item;
    &:before {
      margin-right: 10px;
      display: inline-block;
    }
  }
  > li {
    &:before {
      content: counters(item, '.') '.';
    }
    > ol {
      padding-left: 24px;
      > li {
        &:before {
          content: counters(item, '.') ' ';
        }
        > ol {
          padding: 0 0 0 35px;
          list-style-type: none;
          > li {
            text-indent: 0px;
            padding: 0;
            margin-right: 0;
            &:before {
              content: '-';
              text-indent: 0px;
              padding-right: 0px;
            }
          }
        }
      }
    }
  }
`
