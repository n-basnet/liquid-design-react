import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import { withTheme, injectGlobal, css } from 'styled-components'

import { Base } from '~/Theme'
import ModalContent from '~/components/Modal/ModalContent'
import { GLOBAL_CLASSNAME_PREFIX } from '~/utils/consts'

const TRANSITION_DURATION = 200
const MODAL_OVERLAY_CLASSNAME = `${GLOBAL_CLASSNAME_PREFIX}Modal`

const getReactModalContentStyle = theme => ({
  padding: 0,
  border: 'none',
  bottom: 'auto',
  top: '20px',
  left: '0',
  right: '0',
  margin: 'auto auto 20px',
  width: 'calc(100vw - 40px)',
  maxWidth: '650px',
  boxShadow: theme.doubleBoxShadow,
})

// because setting overlayClassName resets the default overy styling
const modalOverlayDefaults = css`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(255, 255, 255, 0.75);
`

const modalOverlayCloseState = css`
  opacity: 0;
  transform: translateY(20px);
`

injectGlobal`
  .${MODAL_OVERLAY_CLASSNAME}.ReactModal__Overlay {
    transition: all ${TRANSITION_DURATION}ms ease-in-out;
    ${modalOverlayDefaults}
    ${modalOverlayCloseState}
  }

  .${MODAL_OVERLAY_CLASSNAME}.ReactModal__Overlay--after-open{
    opacity: 1;
    transform: none;
  }

  .${MODAL_OVERLAY_CLASSNAME}.ReactModal__Overlay--before-close{
    ${modalOverlayCloseState}
  }
`

const Modal = ({ open, ...props }) => (
  <ReactModal
    isOpen={open}
    ariaHideApp={false}
    style={{ content: getReactModalContentStyle(props.theme) }}
    closeTimeoutMS={TRANSITION_DURATION}
    overlayClassName={MODAL_OVERLAY_CLASSNAME}
    onRequestClose={props.onClose}
    shouldCloseOnOverlayClick
  >
    {/* Theme's Base is needed because ReactModal attaches itself directly to the body element */}
    <Base>
      <ModalContent {...props} />
    </Base>
  </ReactModal>
)

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  ...ModalContent.propTypes,
}

export default withTheme(Modal)
