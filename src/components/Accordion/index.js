import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'
import { media } from '~/utils/styling'

const AccordionWrapper = styled.div`
  ${props => css`
    margin-top: -1px;
    border-bottom: 1px solid ${props.theme.colors.sensitiveGrey.darker};
  `};
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  min-height: 53px;
  padding: 15px;
  font-size: 18px;
  line-height: 1.25;
  ${props => css`
    border-top: 1px solid ${props.theme.colors.sensitiveGrey.darker};
    color: ${props.isOpen
    ? props.theme.colors.primary.base
    : props.theme.colors.richBlack};
    font-weight: ${props.theme.fontWeight.black};
    transition: ${props.theme.transition};
    ${media.max.phone`
      font-size: 16px;

    `};
  `};
  &:hover {
    cursor: pointer;
    ${props => css`
      color: ${props.theme.colors.primary.base};
      background-color: ${props.theme.colors.sensitiveGrey.base};
    `};
  }
  & svg {
    transition: 0.22s all ease-in-out;
    ${props => css`
      transform: ${props.isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'};
    `};
  }
`

export const SectionContent = styled.div`
  padding: 0 15px 10px 50px;
  font-family: Lato;
  font-size: 16px;
  line-height: 1.75;
  ${props => css`
    color: ${props.theme.richBlack};
    transition: ${props.theme.transition};
    height: ${props.isOpen ? 'auto' : '0'};
    overflow: ${props.isOpen ? 'auto' : 'hidden'};
    padding-bottom: ${props.isOpen ? '10' : '0'};
    ${media.max.phone`
      font-size: 14px;
    `};
  `};
`

class Accordion extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    isOpen: PropTypes.bool, // eslint-disable-line react/require-default-props
    title: PropTypes.string.isRequired,
  }

  state = {
    isOpen: null,
  }

  render() {
    const { content, isOpen = this.state.isOpen, title } = this.props

    return (
      <AccordionWrapper isOpen={isOpen}>
        <SectionTitle
          isOpen={isOpen}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <Icon name={'arrowBottom'} size={20} style={{ marginRight: 15 }} />
          {title}
        </SectionTitle>
        <SectionContent isOpen={isOpen}>{content}</SectionContent>
      </AccordionWrapper>
    )
  }
}

export default Accordion
