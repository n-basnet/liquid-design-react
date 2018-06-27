import React from 'react'
import Chance from 'chance'

export const getBackgroundWrapper = (backgroundColor = '#fff') => storyFn =>
  <div style={{
    backgroundColor,
    padding: '30px',
    minHeight: '100vh',
  }}>
    {storyFn()}
  </div>

export const chance = new Chance()
