import React from 'react'
import PropTypes from 'prop-types'

import SingleBreadcrumb from '~/components/Breadcrumbs/SingleBreadcrumb'

const Breadcrumbs = ({
  items = [],
  active,
}) =>
  <div>
    {items.map((v, i) => <SingleBreadcrumb key={i} active={i === active} {...v} />)}
  </div>

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(SingleBreadcrumb.propTypes)),
  active: PropTypes.number,
}

export default Breadcrumbs
