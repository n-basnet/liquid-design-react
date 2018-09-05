import React from 'react'
import PropTypes from 'prop-types'

import Icon from '~/elements/Icon'
import { ListHead } from '~/elements/List/ListHead'
import { ListItem } from '~/elements/List/ListItem'

const List = ({
  activeItemIndex,
  disabledItemIndex,
  grey,
  icon,
  items = [],
  listHead,
  onClick,
}) => {
  const getItemIcon = isActive => (
    <Icon color={`${isActive ? 'primary' : 'richBlack'}.base`} name={icon} size={16} />
  )
  const ListItems = items.map((item, index) => {
    const isActive = index === activeItemIndex
    return (
      <ListItem
        active={isActive}
        disabled={index === disabledItemIndex}
        grey={grey}
        icon={icon}
        key={index}
        onClick={index !== disabledItemIndex ? () => onClick(index) : undefined}
      >
        {icon && getItemIcon(isActive)}
        <span>{item}</span>
      </ListItem>
    )
  })

  return (
    <ul>
      <ListHead grey={grey}>
        {icon && getItemIcon()}
        {listHead}
      </ListHead>
      {ListItems}
    </ul>
  )
}

List.propTypes = {
  activeItemIndex: PropTypes.number,
  disabledItemIndex: PropTypes.number,
  grey: PropTypes.bool,
  icon: PropTypes.string,
  items: PropTypes.array,
  listHead: PropTypes.string,
  onClick: PropTypes.func,
}

List.defaultProps = {
  activeItemIndex: null,
  disabledItemIndex: null,
  grey: false,
  icon: null,
  items: PropTypes.array,
  listHead: null,
  onClick: null,
}

export default List
