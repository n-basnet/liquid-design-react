import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { media } from '~/utils/styling'

const Label = styled.div`
  display: inline-block;
  font-size: 12px;
  line-height: 1.25;
  letter-spacing: 0.2px;
  ${props => css`
    color: ${props.theme.colors.richBlack.base};
  `};
  ${media.max.phone`
    font-size: 16px;
    line-height: 0.94;
    letter-spacing: 0.3px;
  `};
`

Label.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Label
