import React from 'react'
import Chance from 'chance'

export const getBackgroundWrapper = ({ dark } = {}) => storyFn =>
  <div style={{
    backgroundColor: dark ? '#e9e9e8' : '#fff',
    padding: '40px 40px 20px',
  }}>
    {storyFn()}
  </div>

export const chance = new Chance()
