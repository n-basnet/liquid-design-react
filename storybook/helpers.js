import React from 'react'
import Chance from 'chance'

export const getBackgroundWrapper = (backgroundColor = '#fff') => storyFn =>
  <div style={{
    backgroundColor,
    padding: '30px',
  }}>
    {storyFn()}
  </div>

export const getWrapper = style => storyFn =>
  <div style={style}>
    {storyFn()}
  </div>

export const chance = new Chance()
