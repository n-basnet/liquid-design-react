import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import { media } from '~/utils/styling'

const AccordionWrapper = styled.div`
  cursor: pointer;
  ${props => css`
    margin-top: -1px;
    border-bottom: 1px solid ${props.theme.colors.sensitiveGrey.darker};
    transition: ${props.theme.transition};
  `};
  &:hover {
    ${props => css`
      background-color: ${props.theme.colors.sensitiveGrey.base};
    `};
  }
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
    font-weight: ${props.theme.fontWeight.black};
    transition: ${props.theme.transition};
    ${media.max.phone`
      font-size: 16px;
    `};
  `};
  ${props =>
    props.isOpen &&
    css`
      color: ${props.theme.colors.primary.base};
    `};
  &:hover {
    ${props => css`
      color: ${props.theme.colors.primary.base};
    `};
  }
  .${ICON_CLASSNAME} svg {
    transition: 0.22s all ease-in-out;
    ${props => css`
      transform: ${props.isOpen ? 'rotate(0deg)' : 'rotate(180deg)'};
    `};
  }
`

export const SectionContent = styled.div`
  padding: 0 15px 15px 50px;
  font-family: Lato;
  font-size: 16px;
  line-height: 1.75;
  ${props => css`
    transition: ${props.theme.transition};
    visibility: ${props.isOpen ? 'visible' : 'hidden'};
    height: ${props.isOpen ? 'auto' : '0'};
    overflow: ${props.isOpen ? 'auto' : 'hidden'};
    padding-bottom: ${props.isOpen ? '10' : '0'};
    ${media.max.phone`
      font-size: 14px;
    `};
  `};
`

const DEFAULT_IS_OPEN_VALUE = null

class Accordion extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: DEFAULT_IS_OPEN_VALUE,
  }

  state = {
    isOpen: DEFAULT_IS_OPEN_VALUE,
  }

  toggleAccordion = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }))

  render() {
    const { children, title, isOpen } = this.props

    const isAccordionOpen = isOpen !== DEFAULT_IS_OPEN_VALUE ? isOpen : this.state.isOpen

    return (
      <AccordionWrapper isOpen={isAccordionOpen} onClick={this.toggleAccordion}>
        <SectionTitle isOpen={isAccordionOpen}>
          <Icon name='arrowTop' size={20} style={{ marginRight: 15 }} />
          {title}
        </SectionTitle>
        <SectionContent isOpen={isAccordionOpen}>{children}</SectionContent>
      </AccordionWrapper>
    )
  }
}

export default Accordion
