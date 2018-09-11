import React from 'react'
import PropTypes from 'prop-types'

import { BulletList } from '~/elements/TextList/BulletList'
import { NumberedList } from '~/elements/TextList/NumberedList'
import { ListItem } from '~/elements/TextList/ListItem'
import { NUMBERED_LIST, BULLETED_LIST } from '~/elements/TextList/consts.js'
import attachClassName from '~/components/aux/hoc/attachClassName'

export const TextList = ({ items, listType, ...props }) => {
  const ListComponent = listType === BULLETED_LIST ? BulletList : NumberedList

  const renderList = listData =>
    listData.map(node => (
      <ListItem key={node.id} name={node.name}>
        {node.items && <ListComponent>{renderList(node.items)}</ListComponent>}
      </ListItem>
    ))

  return <ListComponent {...props}>{renderList(items)}</ListComponent>
}

TextList.propTypes = {
  listType: PropTypes.oneOf([NUMBERED_LIST, BULLETED_LIST]),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TextList.defaultProps = {
  listType: NUMBERED_LIST,
}

const { Component } = attachClassName(TextList)

export default Component
