import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number } from '@storybook/addon-knobs'
import { without } from 'ramda'
import styled from 'styled-components'

import EnhancedIcon, { Icon, Glyph } from '~/elements/Icon'
import iconsList from '~/elements/Icon/iconsList'
import {
  getStoryMDLink,
  getBackgroundWrapper,
  getPropTablesExcludeList,
  getSnippetTemplate,
} from '../helpers'

const OMIT_ICONS = [
  'circleX',
  'logo',
  'starHalf',
  'dotHalf',
  'warning',
  'warningM',
  'infoCircle',
  'infoFilled',
  'infoM',
  'dots',
  'minus',
  'plus',
  'service',
]

const ICONS_LIST = Object.keys(iconsList['stroke']).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
const GLYPHS_LIST = without(
  OMIT_ICONS,
  Object.keys(iconsList['glyphs']).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
)

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    flex: 1;
  }
`

const IconWrapper = styled.div`
  width: ${props => (props.isOneColumn ? '25%' : '50%')};
  display: inline-block;
  text-align: center;
  min-width: 120px;
  margin: 15px auto;
`

const overrideColorsMap = {
  progressBarDisabled: '#F3F3F7',
  progressBarComingUp: '#D5D5D9',
  radioButtonEmpty: '#E9E9ED',
  favorite: '#CF1B48',
}
const IconSet = ({ iconList, isOneColumn, isFilled, iconProps, isGlyph }) => (
  <div>
    {iconList.map((name, i) => {
      const IconComponent = isGlyph ? Glyph : EnhancedIcon
      return (
        <IconWrapper isOneColumn={isOneColumn} key={i}>
          <IconComponent
            isFilled={isFilled}
            name={name}
            onClick={() => action('click on icon')(name)}
            color={overrideColorsMap[name]}
            {...iconProps}
          />
          <div>{name}</div>
        </IconWrapper>
      )
    })}
  </div>
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
    <IconSet {...props} isOneColumn={isOneColumn} />

    {!isOneColumn && <IconSet {...props} isFilled />}
  </Wrapper>
)

IconsListDisplayed.propTypes = {
  isOneColumn: PropTypes.bool,
}

IconsListDisplayed.defaultProps = {
  isOneColumn: false,
}

const getParams = (excludedPropTypes = []) => ({
  info: {
    propTablesExclude: getPropTablesExcludeList([EnhancedIcon, Glyph, IconSet, IconsListDisplayed]),
    propTables: [Icon],
    excludedPropTypes: ['className', ...excludedPropTypes],
  },
})

const iconDescription = `Icons support content by being an addition to a piece of text. They can be either stroked or filled. See list of available icons ${getStoryMDLink(
  'here',
  { storyName: 'Icon/Icons' }
)}.`

storiesOf('Elements/Icon', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams())
  .add(
    'Icon - stroke',
    () => (
      <EnhancedIcon
        size={number('size', 25, { range: true, min: 0, max: 200, step: 5 })}
        name='bottle'
      />
    ),
    getSnippetTemplate(
      `
  <Icon size={25} name="bottle" />
  `,
      iconDescription
    )
  )
  .add(
    'Icon - filled',
    () => (
      <EnhancedIcon
        size={number('size', 25, { range: true, min: 0, max: 200, step: 5 })}
        name='bottle'
        isFilled
      />
    ),
    getSnippetTemplate(
      `
  <Icon size={25} name="bottle" isFilled />
  `,
      iconDescription
    )
  )

storiesOf('Elements/Icon', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams(['isFilled']))
  .add(
    'Glyph',
    () => (
      <Glyph
        size={number('size', 25, { range: true, min: 0, max: 200, step: 5 })}
        name='calendar'
      />
    ),
    getSnippetTemplate(
      `
  <Glyph size={25} name="calendar" />
  `,
      `Glyphs support the interface and are not connected to the content. See list of available glyphs ${getStoryMDLink(
        'here',
        { storyName: 'Icon/Glyphs' }
      )}.`
    )
  )

storiesOf('Elements/Icon/Icons', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams())
  .add('default color', () => <IconsListDisplayed iconList={ICONS_LIST} />)
  .add('secondary color', () => (
    <IconsListDisplayed iconProps={{ secondary: true }} iconList={ICONS_LIST} />
  ))
  .add('alternative color', () => (
    <IconsListDisplayed iconProps={{ color: 'richRed.base' }} iconList={ICONS_LIST} />
  ))
  .add('custom color', () => (
    <IconsListDisplayed iconProps={{ color: '#3bff00' }} iconList={ICONS_LIST} />
  ))

storiesOf('Elements/Icon/Glyphs', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters(getParams(['isFilled']))
  .add('default', () => <IconsListDisplayed isOneColumn isGlyph iconList={GLYPHS_LIST} />)
