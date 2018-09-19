import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number } from '@storybook/addon-knobs'
import { without } from 'ramda'
import styled from 'styled-components'

import {
  includeComponentInPropTable,
  getBackgroundWrapper,
  getPropTablesExcludeList,
} from '../helpers'
import IconComponent, { IconProvider, Icon, Glyph } from '~/elements/Icon'
import iconsList from '~/elements/Icon/iconsList'

const OMIT_ICONS = [
  'circleX',
  'information',
  'logo',
  'starHalf',
  'dotHalf',
  'warning',
  'infoCircle',
  'infoFilled',
  'dots',
  'service',
]

const ICONS_LIST = Object.keys(iconsList['stroke']).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
const GLYPHS_LIST = without(
  OMIT_ICONS,
  Object.keys(iconsList['glyphs']).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
)

const getProperIconTheme = (name, iconProps, isGlyph, isFilled, props) => {
  const colorsMap = {
    progressBarDisabled: '#F3F3F7',
    progressBarComingUp: '#D5D5D9',
    radioButtonEmpty: '#E9E9ED',
    favorite: '#CF1B48',
  }
  return (
    <IconComponent
      isGlyph={isGlyph}
      isFilled={isFilled}
      name={name}
      onClick={() => action('click on icon')(name)}
      color={colorsMap[name]}
      {...iconProps}
    />
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const IconWrapper = styled.div`
  width: ${props => (props.isOneColumn ? '25%' : '50%')};
  display: inline-block;
  text-align: center;
  min-width: 120px;
  margin: 15px auto;
`

const IconSet = ({ iconList, iconProps, isOneColumn, isGlyph, isFilled }) => (
  <Fragment>
    {iconList.map((name, i) => (
      <IconWrapper isOneColumn={isOneColumn} key={i}>
        {getProperIconTheme(name, iconProps, isGlyph, isFilled)}
        <div>{name}</div>
      </IconWrapper>
    ))}
  </Fragment>
)

IconSet.propTypes = {
  iconList: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconProps: PropTypes.object,
  isOneColumn: PropTypes.bool,
  isGlyph: PropTypes.bool,
  isFilled: PropTypes.bool,
}

IconSet.defaultProps = {
  iconProps: {},
  isOneColumn: false,
  isGlyph: false,
  isFilled: false,
}

const IconsListDisplayed = ({ isOneColumn, ...props }) => (
  <Wrapper>
    <div style={{ flex: 1 }}>
      <IconSet {...props} isOneColumn={isOneColumn} />
    </div>
    {!isOneColumn && (
      <div style={{ flex: 1 }}>
        <IconSet {...props} isFilled />
      </div>
    )}
  </Wrapper>
)

IconsListDisplayed.propTypes = {
  iconNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOneColumn: PropTypes.bool,
}

IconsListDisplayed.defaultProps = {
  isOneColumn: false,
}

storiesOf('Elements/Icon', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(IconProvider))
  .addParameters({
    info: {
      maxPropObjectKeys: 0,
      propTablesExclude: getPropTablesExcludeList([
        IconSet,
        Icon,
        IconComponent,
        IconsListDisplayed,
        Glyph,
      ]),
      excludedPropTypes: ['isGlyph'],
    },
  })
  .add('single Icon', () => (
    <IconComponent
      size={number('size', 25, { range: true, min: 0, max: 200, step: 5 })}
      name='bottle'
    />
  ))
  .add('default', () => <IconsListDisplayed iconList={ICONS_LIST} />)
  .add('secondary color', () => (
    <IconsListDisplayed iconProps={{ secondary: true }} iconList={ICONS_LIST} />
  ))
  .add('alternative color', () => (
    <IconsListDisplayed iconProps={{ color: 'sensitiveGrey.darker' }} iconList={ICONS_LIST} />
  ))
  .add('custom color', () => (
    <IconsListDisplayed iconProps={{ color: '#3bff00' }} iconList={ICONS_LIST} />
  ))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([IconSet, Icon, IconsListDisplayed, Glyph]),
      excludedPropTypes: ['isFilled'],
    },
  })
  .add('glyphs', () => <IconsListDisplayed isOneColumn isGlyph iconList={GLYPHS_LIST} />)
