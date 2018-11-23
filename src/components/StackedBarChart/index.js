import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { prop, isEmpty, append, without, contains } from 'ramda'

import attachClassName from '~/components/aux/hoc/attachClassName'
import withHoverLine from '~/components/aux/hoc/withHoverLine'
import SingleBar from '~/components/StackedBarChart/SingleBar'
import Labels from '~/components/aux/charts/Labels'
import { normaliseData, getLabels } from '~/components/StackedBarChart/utils'
import { DIMENSIONS, BAR_SIDE_OFFSET, BAR_SIDE_MARGIN } from '~/components/StackedBarChart/consts'

const BarsWrapper = withHoverLine(styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`)

const MainWrapper = styled.div`
  max-width: ${props => props.maxWidth}px;
  position: relative;
`

export class StackedBarChart extends PureComponent {
  static propTypes = {
    /** The data for the chart. Any additional properties of an element from `values` array will be displayed on a tooltip after clicking on a value. */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.shape({
              name: PropTypes.string.isRequired,
              color: PropTypes.string,
            }).isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    /** the offset between the top of the highest bar and the top of it's enclosing rectangle */
    barTopPadding: PropTypes.number,
  }
  static defaultProps = {
    barTopPadding: 61,
  }
  state = {
    data: [],
    labels: [],
    selectedLabelsIds: [],
    selectedPointData: null,
  }
  componentDidMount() {
    this.recomputeState()
  }
  recomputeState = (props = this.props) => {
    const { data } = props
    if (data.length === 0) {
      return
    }
    const labels = getLabels(props.data)
    this.setState({
      data: normaliseData(props.data, labels),
      labels,
    })
  }
  resetSelectedPointId = () => this.setState({ selectedPointData: null })
  getFilteredData = () => {
    const { data, selectedLabelsIds } = this.state
    return data.map(({ values, ...dataPoint }) => ({
      values: values.reduce((values, value) => {
        if (isEmpty(selectedLabelsIds) || contains(value.label.id, selectedLabelsIds)) {
          return append(value, values)
        } else {
          return values
        }
      }, []),
      ...dataPoint,
    }))
  }
  getLabelClickHandler = ({ id }) => () => {
    const { selectedLabelsIds, selectedPointData } = this.state
    const isSelected = contains(id, selectedLabelsIds)
    this.setState({
      ...(selectedPointData && { selectedPointData: null }),
      selectedLabelsIds: isSelected
        ? without([id], selectedLabelsIds)
        : append(id, selectedLabelsIds),
    })
  }
  getDataRectClickHandler = rectData => () =>
    this.setState(({ selectedPointData }) => ({
      selectedPointData: rectData.id === prop('id', selectedPointData) ? null : rectData,
    }))
  render() {
    const { barTopPadding, data: dataFromProps, ...props } = this.props
    const { labels, selectedLabelsIds, selectedPointData } = this.state
    const data = this.getFilteredData()

    return (
      <MainWrapper
        {...props}
        maxWidth={data.length * (DIMENSIONS.x + BAR_SIDE_MARGIN) - BAR_SIDE_MARGIN}
      >
        <BarsWrapper
          hideLine={!!selectedPointData}
          max={DIMENSIONS.y}
          lineStyle={{
            left: `${BAR_SIDE_OFFSET}px`,
            width: `calc(100% - ${BAR_SIDE_OFFSET * 2}px)`,
          }}
        >
          {data.map((point, i) => (
            <SingleBar
              key={i}
              index={i}
              point={point}
              width={DIMENSIONS.x}
              height={DIMENSIONS.y}
              topPadding={barTopPadding}
              handleDataRectClick={this.getDataRectClickHandler}
              selectedPointData={selectedPointData}
              resetSelectedPointId={this.resetSelectedPointId}
            />
          ))}
        </BarsWrapper>
        <Labels
          labels={labels}
          onLabelClick={this.getLabelClickHandler}
          selectedLabelsIds={selectedLabelsIds}
        />
      </MainWrapper>
    )
  }
}

const { Component } = attachClassName(StackedBarChart)

export default Component
