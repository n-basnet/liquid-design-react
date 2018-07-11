import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { getBackgroundWrapper } from '../helpers'
import IconWithTheme, { Icon } from '~/elements/Icon'
import { DEFAULT_THEME } from '~/utils/consts/themes'

const ICONS = [
  'bottle',
  'bus',
  'costCenter',
  'energy',
  'travel',
  'finance',
  'goods',
  'transportation',
  'it',
  'material',
  'misc',
  'personnelCosts',
  'postings',
  'promotion',
  'rental',
  'research',
  'service',
  'startup',
  'technicalService',
  'board',
]

const GLYPHS = [
  'arrowTop',
  'bell',
  'checkbox',
  'close',
  'exportFile',
  'radioButton',
  'preferences',
  'info',
]

const IconSet = ({ iconList, iconProps = {} }) => (
  <Fragment>
    {iconList.map((name, i) => (
      <div key={i} style={{ display: 'inline-block', margin: '10px', width: '130px' }}>
        <IconWithTheme
          name={name}
          size={20}
          onClick={action('click on icon')}
          {...iconProps}
        />
        <div>{name}</div>
      </div>
    ))}
  </Fragment>
)

IconSet.propTypes = {
  iconList: PropTypes.arrayOf(PropTypes.string),
  iconProps: PropTypes.object,
}

storiesOf('Elements/Icon', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      maxPropObjectKeys: 0,
    },
  })
  .add('single Icon', () => (
    <Icon name='bottle' size={20} theme={DEFAULT_THEME} />
  ))
  .addDecorator(storyFn => (
    <Fragment>
      {/* just to make addon-info aware of the original `Icon` props */}
      <Icon style={{ display: 'none' }} name='board' theme={DEFAULT_THEME} />
      {storyFn()}
    </Fragment>
  ))
  .addParameters({
    info: {
      source: false,
      propTablesExclude: [
        IconSet,
        Fragment,
      ],
    },
  })
  .add('default', () => (
    <IconSet iconList={ICONS} />
  ))
  .add('secondary color', () => (
    <IconSet iconList={ICONS} iconProps={{ secondary: true }} />
  ))
  .add('alternative color', () => (
    <IconSet iconList={ICONS} iconProps={{ color: 'darkGrey' }} />
  ))
  .add('custom color', () => (
    <IconSet iconList={ICONS} iconProps={{ color: '#3bff00' }} />
  ))
  .add('glyphs', () => (
    <IconSet iconList={GLYPHS} />
  ))
