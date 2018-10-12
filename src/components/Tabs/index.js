import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import cx from 'classnames'

import { tabsPropTypes, tabsDefaultProps } from '~/components/Tabs/propTypes'
import TabHead from '~/components/Tabs/TabHead'
import TabContent from '~/components/Tabs/TabContent'
import { media } from '~/utils/styling'
import { getClassName } from '~/components/aux/hoc/attachClassName'

const TABS_CLASSNAME = getClassName({ name: 'Tabs' })

const TabsWrapper = styled.div`
  ${process.env.NODE_ENV === 'test'
    ? ''
    : media.max.tablet`
    @supports (-webkit-marquee-repetition: infinite) and (object-fit: fill) {
 max-width: ${props => `calc(${props.mobileSafariViewportWidth}vw - ${props.mobileSafariGap})`};
    }
  `};
`

const TabHeadsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.appearance === 'sticky' ? '50px' : '40px')};
  ${props =>
    props.appearance === 'bar' &&
    css`
      border-radius: 5px;
      overflow: hidden;
    `};
  div {
    div:not(:last-child) {
      margin-right: ${props => props.appearance === 'bar' && '2px'};
    }
  }
`

/*
 * SrcollBarHack:
 * this solution pushes out the scroll bar outside of the container and makes it invisible
 * it is necessary, as currently it is only possible to hide chrome scroll bar
 *
 * @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) is an ie11 specific selector
 * @supports (-ms-ime-align: auto) is an Edge specific selector
 */

const ScrollBarHack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-bottom: 17px;
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    padding-bottom: 0px;
  }

  ${process.env.NODE_ENV === 'test'
    ? ''
    : media.max.tablet`
    @supports (-ms-ime-align: auto) {
    padding-bottom: 0px;
  }
  `};
  box-sizing: content-box;
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
`

class Tabs extends Component {
  static propTypes = {
    appearance: tabsPropTypes.appearance,
    tabsData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.node,
      })
    ).isRequired,
    disabledIndexes: PropTypes.arrayOf(PropTypes.number),
    /**
     * because of the mobile Safari `overflow: hidden` issue, which also leads to scrolling issue,
     * it is necessary to restrict the width of a component in a mobile Safari - it is automatically
     * restricted to 100vw, though the user can provide different viewport value
     */
    mobileSafariViewportWidth: PropTypes.number,
    /**
     * because of the mobile Safari `overflow: hidden` issue, which also leads to scrolling issue,
     * it is necessary to restrict the width of a component in a mobile Safari - it is automatically
     * restricted to 100vw, however, the user can subtract a certain value with a specific unit provided
     * in a string. eg if there is padding on both sides, which is 20px, then this amount shaould be multiplied
     * by 2 and '40px' shall be provided in a mobileSafariGap prop. in such a way the max width of the component
     * will equal to 100vw - 40px
     */
    mobileSafariGap: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    appearance: tabsDefaultProps.appearance,
    disabledIndexes: [],
    mobileSafariViewportWidth: 100,
    mobileSafariGap: null,
    className: null,
  }

  state = {
    selectedTabId: 0,
  }

  renderTabHeads = () =>
    this.props.tabsData.map((tab, index) => (
      <TabHead
        appearance={this.props.appearance}
        id={index}
        disabled={this.props.disabledIndexes.indexOf(index) !== -1}
        key={`${index}-${tab.name}`}
        onClick={this.getTabClickHandler(index)}
        selectedTabId={this.state.selectedTabId}
        lastTabId={this.props.tabsData.length - 1}
      >
        {tab.name}
      </TabHead>
    ))

  renderTabContent = () =>
    this.props.tabsData.map((tab, index) => (
      <TabContent id={index} key={`${index}-${tab.name}-content`} {...this.state}>
        {tab.content}
      </TabContent>
    ))

  getTabClickHandler = selectedTabId => () => this.setState({ selectedTabId })

  render() {
    const {
      appearance,
      mobileSafariViewportWidth,
      mobileSafariGap,
      className,
      ...props
    } = this.props

    return (
      <TabsWrapper
        mobileSafariViewportWidth={mobileSafariViewportWidth}
        mobileSafariGap={mobileSafariGap}
        className={cx(className, TABS_CLASSNAME)}
        {...props}
      >
        <TabHeadsWrapper appearance={appearance}>
          <ScrollBarHack>{this.renderTabHeads()}</ScrollBarHack>
        </TabHeadsWrapper>
        {this.renderTabContent()}
      </TabsWrapper>
    )
  }
}

export default Tabs
