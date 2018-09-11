import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { media } from '~/utils/styling'
import attachClassName from '~/components/aux/hoc/attachClassName'

const LabelWrapper = styled.div`
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

export const Label = props => <LabelWrapper {...props} />

Label.propTypes = {
  children: PropTypes.node.isRequired,
}

const { Component } = attachClassName(Label)

export default Component
