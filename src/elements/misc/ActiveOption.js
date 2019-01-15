import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import { media } from '~/utils/styling'

const ACTIVE_ICON_CLASSNAME = `${ICON_CLASSNAME}ActiveIcon`

const ActiveOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .${ACTIVE_ICON_CLASSNAME} {
    margin-right: 22px;

    ${media.max.phone`
      transform: scale(1.3);
      margin-right: 15px;
    `};
  }
`

const handleRemoveActiveOption = ({ activeOption, onIconClick }) => e => {
  e.stopPropagation()
  onIconClick(activeOption)
}

const ActiveOption = ({ closeIcon, onIconClick, activeOption, style }) => (
  <ActiveOptionWrapper>
    <Glyph
      name={closeIcon.name}
      className={ACTIVE_ICON_CLASSNAME}
      style={style}
      size={closeIcon.size}
      onClick={handleRemoveActiveOption({ activeOption, onIconClick })}
    />
    {activeOption.name}
  </ActiveOptionWrapper>
)

ActiveOption.propTypes = {
  activeOption: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onIconClick: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  closeIcon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }),
}

ActiveOption.defaultProps = {
  label: null,
  style: {},
  closeIcon: {
    name: 'close',
    size: 16,
  },
}

export default ActiveOption
