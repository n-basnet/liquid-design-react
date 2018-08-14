import React from 'react'
import PropTypes from 'prop-types'

import { BulletList } from '~/elements/TextList/BulletList'
import { NumberedList } from '~/elements/TextList/NumberedList'
import { ListItem } from '~/elements/TextList/ListItem'
import { NUMBERED_LIST, BULLETED_LIST } from '~/elements/TextList/consts.js'

const TextList = ({ data, listType }) => {
  const ListComponent = listType === BULLETED_LIST ? BulletList : NumberedList

  const renderList = listData =>
    listData.map(node => (
      <ListItem key={node.id} name={node.name}>
        {node.items && <ListComponent>{renderList(node.items)}</ListComponent>}
      </ListItem>
    ))

  return <ListComponent>{renderList(data)}</ListComponent>
}

TextList.propTypes = {
  listType: PropTypes.oneOf([NUMBERED_LIST, BULLETED_LIST]),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TextList.defaultProps = {
  listType: NUMBERED_LIST,
}

export default TextList
