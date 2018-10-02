import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import { withTheme, injectGlobal, css } from 'styled-components'
import cx from 'classnames'

import { Base } from '~/Theme'
import ModalContent from '~/components/Modal/ModalContent'
import { getClassName } from '~/components/aux/hoc/attachClassName'

const TRANSITION_DURATION = 200
const MODAL_MARGIN = 20

const getReactModalContentStyle = theme => ({
  padding: 0,
  border: 'none',
  bottom: 'auto',
  top: `${MODAL_MARGIN}px`,
  left: '0',
  right: '0',
  margin: `auto auto ${MODAL_MARGIN}px`,
  width: `calc(100% - ${MODAL_MARGIN}px)`,
  maxHeight: `calc(100% - ${MODAL_MARGIN * 2}px)`,
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
  transform: none;

  .ReactModal__Content {
    transform: translateY(20px);
  }
`

export const Modal = ({ open, overlayAuxClassName, reactModalProps, ...props }) => (
  <ReactModal
    isOpen={open}
    ariaHideApp={false}
    style={{ content: getReactModalContentStyle(props.theme) }}
    closeTimeoutMS={TRANSITION_DURATION}
    overlayClassName={cx(overlayAuxClassName, MODAL_OVERLAY_CLASSNAME)}
    onRequestClose={props.onClose}
    shouldCloseOnOverlayClick
    {...reactModalProps}
  >
    {/* Theme's Base is needed because ReactModal attaches itself directly to the body element */}
    <Base>
      <ModalContent {...props} />
    </Base>
  </ReactModal>
)

const MODAL_OVERLAY_CLASSNAME = getClassName(Modal)

injectGlobal`
  .${MODAL_OVERLAY_CLASSNAME}.ReactModal__Overlay {
    ${modalOverlayDefaults}
    ${modalOverlayCloseState}
    &,
    .ReactModal__Content {
      transition: all ${TRANSITION_DURATION}ms ease-in-out;
    }
  }

  .${MODAL_OVERLAY_CLASSNAME}.ReactModal__Overlay--after-open{
    opacity: 1;
    transform: none;
    .ReactModal__Content {
      transform: none;
    }
  }

  .${MODAL_OVERLAY_CLASSNAME}.ReactModal__Overlay--before-close{
    ${modalOverlayCloseState}
  }
`

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  /** props to be passed to `react-modal` */
  reactModalProps: PropTypes.object,
  /** additional classname for `react-modal` overlay */
  overlayAuxClassName: PropTypes.string,
  ...ModalContent.propTypes,
}

Modal.defaultProps = {
  reactModalProps: {},
  overlayAuxClassName: null,
}

export { ModalContent }

export default withTheme(Modal)
