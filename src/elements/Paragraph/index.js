import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const fontSizeSelector = props => {
  const sizeMap = {
    xl: '22px',
    lg: '18px',
    md: '16px',
    sm: '14px',
    xs: '12px',
  }

  return sizeMap[props.type]
}

const Paragraph = styled.p`
  line-height: 1.75;
  ${props => css`
    font-size: ${fontSizeSelector(props)};
    color: ${props.theme.colors.richBlack.base};
  `};
  a {
    ${props => css`
      color: ${props.theme.colors.primary.base};
      cursor: pointer;
    `};
    &:hover {
      text-decoration: underline;
    }
    &:active {
      text-decoration: none;
      font-weight: ${props => props.theme.fontWeight.black};
    }
  }
`

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
}

Paragraph.defaultProps = {
  type: 'md',
}

export default Paragraph
