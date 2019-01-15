import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SingleBreadcrumb from '~/components/Breadcrumbs/SingleBreadcrumb'
import attachClassName from '~/components/misc/hoc/attachClassName'

const BreadcrumbsWrapper = styled.div`
  display: inline-block;
`

export const Breadcrumbs = ({ items, active, ...props }) => (
  <BreadcrumbsWrapper {...props}>
    {items.map((v, i) => (
      <SingleBreadcrumb key={i} active={i === active} {...v} />
    ))}
  </BreadcrumbsWrapper>
)

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(SingleBreadcrumb.propTypes)),
  /** index of the item that should be marked as active (e.g. current in the navigation) */
  active: PropTypes.number,
}

Breadcrumbs.defaultProps = {
  items: [],
  active: null,
}

const { Component } = attachClassName(Breadcrumbs)

export default Component
