import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Glyph } from '~/elements/Icon'
import { ListHead } from '~/elements/List/ListHead'
import { ListItem } from '~/elements/List/ListItem'
import attachClassName from '~/components/aux/hoc/attachClassName'

const ListWrapper = styled.ul`
  max-width: 300px;
  padding: 0;
  margin: 0;
`

export const List = ({
  activeItemIndex,
  disabledItemIndex,
  grey,
  icon,
  items = [],
  listHead,
  onClick,
  ...props
}) => {
  const getItemIcon = isActive => (
    <Glyph color={`${isActive ? 'primary' : 'richBlack'}.base`} name={icon} size={16} />
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
    <ListWrapper {...props}>
      <ListHead grey={grey}>
        {icon && getItemIcon()}
        {listHead}
      </ListHead>
      {ListItems}
    </ListWrapper>
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

const { Component } = attachClassName(List)

export default Component
