import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number } from '@storybook/addon-knobs'
import { without } from 'ramda'

import { getBackgroundWrapper } from '../helpers'
import IconWithTheme, { Icon } from '~/elements/Icon'
import iconsList from '~/elements/Icon/iconsList'

const GLYPHS = [
  'arrowTop',
  'bell',
  'checkboxFilled',
  'close',
  'exportFile',
  'radioButton',
  'preferences',
  'info',
]

const OMIT_ICONS = [
  'circleX',
  'star',
  'starHalf',
  'dot',
  'dotHalf',
  'arrowRight',
  'warning',
  'checkboxEmpty',
  'infoCircle',
  'heart',
  'search',
]

const SORTED_ICON_NAMES = Object.keys(iconsList).sort(
  (a, b) => (a < b ? -1 : a > b ? 1 : 0)
)
const ICONS_LIST = without(OMIT_ICONS, SORTED_ICON_NAMES)
const ICONS = without(GLYPHS, ICONS_LIST)

const IconSet = ({ iconList, iconProps }) => (
  <Fragment>
    {iconList.map((name, i) => (
      <div
        key={i}
        style={{ display: 'inline-block', margin: '10px', width: '130px' }}
      >
        <IconWithTheme
          name={name}
          onClick={() => action('click on icon')(name)}
          {...iconProps}
        />
        <div>{name}</div>
      </div>
    ))}
  </Fragment>
)

IconSet.propTypes = {
  iconList: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconProps: PropTypes.object,
}

IconSet.defaultProps = {
  iconProps: {},
}

storiesOf('Elements/Icon', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      maxPropObjectKeys: 0,
    },
  })
  .add('single Icon', () => (
    <Icon
      size={number('size', 25, { range: true, min: 0, max: 200, step: 5 })}
      name='bottle'
    />
  ))
  .addDecorator(storyFn => (
    <Fragment>
      {/* just to make addon-info aware of the original `Icon` props */}
      <Icon style={{ display: 'none' }} name='board' />
      {storyFn()}
    </Fragment>
  ))
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [IconSet, Fragment],
    },
  })
  .add('default', () => <IconSet iconList={ICONS} />)
  .add('secondary color', () => (
    <IconSet iconList={ICONS} iconProps={{ secondary: true }} />
  ))
  .add('alternative color', () => (
    <IconSet iconList={ICONS} iconProps={{ color: 'sensitiveGrey.darker' }} />
  ))
  .add('custom color', () => (
    <IconSet iconList={ICONS} iconProps={{ color: '#3bff00' }} />
  ))
  .add('glyphs', () => <IconSet iconList={GLYPHS} />)
