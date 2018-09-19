import React from 'react'
import PropTypes from 'prop-types'

import { Glyph } from '~/elements/Icon'
import { TagWrapper } from '~/elements/Tag/TagWrapper'
import { Label } from '~/elements/Tag/Label'
import Ellipsis from '~/components/aux/Ellipsis'
import attachClassName from '~/components/aux/hoc/attachClassName'

export const Tag = ({ disabled, icon, label, outline, onIconClick, iconSize, ...props }) => (
  <TagWrapper disabled={disabled} outline={outline} {...props}>
    <div>
      <Label disabled={disabled} outline={outline}>
        <Ellipsis>{label}</Ellipsis>
      </Label>
      <Glyph
        outline={outline}
        name={icon}
        style={{ margin: '0 2px' }}
        size={iconSize}
        onClick={onIconClick}
      />
    </div>
  </TagWrapper>
)

Tag.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  outline: PropTypes.bool,
  onIconClick: PropTypes.func,
  iconSize: PropTypes.number,
}

Tag.defaultProps = {
  disabled: null,
  icon: 'close',
  label: 'Tag',
  outline: null,
  onIconClick: null,
  iconSize: 16,
}

const { Component } = attachClassName(Tag)

export default Component
