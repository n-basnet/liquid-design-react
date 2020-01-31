import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Glyph } from '../../elements/Icon'
import { ListHead } from '../../elements/List/ListHead'
import { ListItem } from '../../elements/List/ListItem'
import attachClassName from '../../components/misc/hoc/attachClassName'

const ListWrapper = styled.ul`
  max-width: 300px;
  padding: 0;
  margin: 0;
`

export const List = ({
  activeItemIndex,
  grey,
  items = [],
  listHead,
  ...props
}) => {
  const getItemIcon = (name, isActive) => (
    <Glyph
      color={`${isActive ? 'primary' : 'richBlack'}.base`}
      name={name}
      size={16}
    />
  )
  const ListItems = items.map(
    ({ name, iconName, onClick, isDisabled }, index) => {
      const isActive = index === activeItemIndex
      return (
        <ListItem
          key={index}
          active={isActive}
          disabled={isDisabled}
          grey={grey}
          onClick={!isDisabled && onClick ? onClick : undefined}
        >
          {iconName && getItemIcon(iconName, isActive)}
          <span>{name}</span>
        </ListItem>
      )
    },
  )

  return (
    <ListWrapper {...props}>
      <ListHead grey={grey}>
        {listHead.iconName && getItemIcon(listHead.iconName)}
        {listHead.name}
      </ListHead>
      {ListItems}
    </ListWrapper>
  )
}

List.propTypes = {
  listHead: PropTypes.shape({
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      iconName: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
  activeItemIndex: PropTypes.number,
  grey: PropTypes.bool,
}

List.defaultProps = {
  items: [],
  activeItemIndex: null,
  grey: false,
}

const { Component } = attachClassName(List)

export default Component
