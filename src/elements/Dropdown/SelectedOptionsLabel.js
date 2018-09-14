import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { optionPropType, optionDefaultProps } from '~/elements/Dropdown/props'
import Tag from '~/elements/Tag'

const stopClickPropagation = e => e.stopPropagation()
const SelectedItem = ({ name, handleRemove }) => (
  <Tag
    label={name}
    onClick={stopClickPropagation}
    style={{ paddingRight: '3px', paddingBottom: '2px' }}
    iconSize={12}
    onIconClick={handleRemove}
  />
)

SelectedItem.propTypes = {
  ...optionPropType,
  handleRemove: PropTypes.func.isRequired,
}
SelectedItem.defaultProps = { ...optionDefaultProps }

const SelectedOptionsLabelWrapper = styled.div`
  max-width: calc(100% - 25px);
  padding-right: 10px;
  line-height: 16px;
  min-height: 28px;
`

const SelectedOptionsLabel = ({ items, handleRemove }) => (
  <SelectedOptionsLabelWrapper>
    {items.map(item => (
      <SelectedItem key={item.id} {...item} handleRemove={() => handleRemove(item.id)} />
    ))}
  </SelectedOptionsLabelWrapper>
)

SelectedOptionsLabel.propTypes = {
  items: PropTypes.array,
  handleRemove: PropTypes.func.isRequired,
}

SelectedOptionsLabel.defaultProps = {
  items: [],
}

export default SelectedOptionsLabel
