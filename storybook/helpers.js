import React from 'react'
import loremIpsum from 'fast-lorem-ipsum'
import { text } from '@storybook/addon-knobs'

export const getBackgroundWrapper = ({ dark } = {}) => storyFn => (
  <div
    style={{
      backgroundColor: dark ? '#e9e9e8' : '#fff',
      padding: '40px 40px 20px',
    }}
  >
    {storyFn()}
  </div>
)

export const placeholderText = amount => loremIpsum(amount, 'w')

export const getTextKnob = ({
  name = 'content',
  defaultText,
  placeholderTextLength = 30,
} = {}) => text(name, defaultText || placeholderText(placeholderTextLength))
