import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty, pick, contains } from 'ramda'

import { media } from '../../../utils/styling'

const LabelsWrapper = styled.div`
  margin-top: 23px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${media.max.phone`
    justify-content: flex-start;
  `}
`

const LabelWrapper = styled.div.attrs({
  'data-test-value': 'chart-label',
})`
  font-size: 12px;
  padding-right: 20px;
  padding-bottom: 10px;
  color: ${props => props.theme.colors.richBlack.base};
  cursor: pointer;
  opacity: ${props => (props.isSelected ? 1 : 0.3)};
`

const LabelColorIndicator = styled.div`
  display: inline-block;
  margin-right: 10px;
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  border-radius: 3px;
  border-top-right-radius: 6px;
`

export const SingleLabel = ({ name, color, onClick, isSelected }) => (
  <LabelWrapper onClick={onClick} isSelected={isSelected}>
    <LabelColorIndicator color={color} />
    {name}
  </LabelWrapper>
)

SingleLabel.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

SingleLabel.defaultProps = {
  onClick: () => {},
  isSelected: true,
}

const Labels = ({ labels, onLabelClick, selectedLabelsIds }) => {
  const isLabelSelected = id =>
    isEmpty(selectedLabelsIds) || contains(id, selectedLabelsIds)
  return (
    <LabelsWrapper>
      {labels.map(label => (
        <SingleLabel
          key={label.id}
          {...label}
          onClick={onLabelClick(label)}
          isSelected={isLabelSelected(label.id)}
        />
      ))}
    </LabelsWrapper>
  )
}

Labels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape(pick(['name', 'color'], SingleLabel.propTypes)),
  ).isRequired,
  onLabelClick: PropTypes.func.isRequired,
  selectedLabelsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Labels
