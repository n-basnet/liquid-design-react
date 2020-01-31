import React from 'react'
import { rgba } from 'polished'
import { withTheme } from 'styled-components'

import Modal from '../../components/Modal'
import { getClassName } from '../../components/misc/hoc/attachClassName'

const LightBoxStyles = withTheme(({ theme }) => (
  <style>
    {`
      body > div:not(.ReactModalPortal) {
        filter: blur(5px);
      }
      .${LIGHT_BOX_OVERLAY_CLASSNAME}.ReactModal__Overlay {
        background-color: ${rgba(theme.colors.richBlack.base, 0.7)};
      }
    `}
  </style>
))

export const LightBox = props => (
  <>
    {props.open && <LightBoxStyles />}
    <Modal overlayAuxClassName={LIGHT_BOX_OVERLAY_CLASSNAME} {...props} />
  </>
)

const LIGHT_BOX_OVERLAY_CLASSNAME = getClassName(LightBox)

LightBox.propTypes = Modal.propTypes

export default LightBox
