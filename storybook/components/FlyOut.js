import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { number } from '@storybook/addon-knobs'

import { FlyOut } from '~'
import { getBackgroundWrapper, getTextKnob } from '../helpers'

const OPTIONS = [
  { name: 'Option 1', onClick: action('Option 1') },
  {
    name: 'Option 2',
    options: [
      { name: 'Sub Option 1', onClick: action('Sub Option 1') },
      { name: 'Sub Option 2', onClick: action('Sub Option 2') },
      { name: 'Sub Option 3', onClick: action('Sub Option 3') },
      { name: 'Sub Option 4', onClick: action('Sub Option 4') },
    ],
  },
  { name: 'Option 3', onClick: action('Option 3') },
]

const getLabel = () => getTextKnob({ defaultText: 'Flyout Label', name: 'label' })
const getHeadline = () => getTextKnob({ defaultText: 'Headline', name: 'headline' })

storiesOf('Components/FlyOut', module)
  .addDecorator(getBackgroundWrapper())
  .add('right aligned', () => (
    <div style={{ marginLeft: '120px' }}>
      <FlyOut name={getHeadline()} options={OPTIONS} label={getLabel()} />
    </div>
  ))
  .add('left aligned', () => (
    <FlyOut name={getHeadline()} options={OPTIONS} label={getLabel()} alignLeft />
  ))
  .add('right aligned disabled', () => (
    <div style={{ marginLeft: '120px' }}>
      <FlyOut name={getHeadline()} options={OPTIONS} label={getLabel()} disabled />
    </div>
  ))
  .add('left aligned disabled', () => (
    <FlyOut disabled name={getHeadline()} options={OPTIONS} label={getLabel()} alignLeft />
  ))
  .add('center aligned', () => (
    <div style={{ marginLeft: '120px' }}>
      <FlyOut name={getHeadline()} options={OPTIONS} />
    </div>
  ))
  .add('center aligned disabled', () => (
    <div style={{ marginLeft: '120px' }}>
      <FlyOut disabled name={getHeadline()} options={OPTIONS} />
    </div>
  ))
  .add('forced width', () => (
    <FlyOut
      name={getHeadline()}
      options={OPTIONS}
      label={getLabel()}
      alignLeft
      width={number('width', 200, { range: true, min: 100, max: 600, step: 1 })}
    />
  ))
