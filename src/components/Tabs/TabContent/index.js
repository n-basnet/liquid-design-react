import React from 'react'
import styled from 'styled-components'

import { tabsPropTypes } from '~/components/Tabs/propTypes'

const TabContentWrapper = styled.div`
  display: ${props => (props.isSelected ? 'block' : 'none')};
  position: relative;
  z-index: ${props => props.theme.zIndex.tabs};
  background: ${props => props.theme.colors.white.base};
  transition: ${props => props.theme.transition};
`

const TabContent = ({ children, id, selectedTabId }) => (
  <TabContentWrapper isSelected={id === selectedTabId}>{children}</TabContentWrapper>
)

TabContent.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: tabsPropTypes.children,
  // eslint-disable-next-line react/require-default-props
  id: tabsPropTypes.id,
  // eslint-disable-next-line react/require-default-props
  selectedTabId: tabsPropTypes.selectedTabId,
}

export default TabContent
