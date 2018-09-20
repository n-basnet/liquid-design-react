import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  getBackgroundWrapper,
  getTextKnob,
  getPropTablesExcludeList,
  includeComponentInPropTable,
} from '../helpers'
import TextField, { TEXT_FIELD_CLASSNAMES } from '~/elements/TextField'
import Placeholder from '~/components/aux/Placeholder'
import { default as EnhancedModal, Modal } from '~/components/Modal'
import { THEMES, DEFAULT_THEME_NAME } from '~/utils/consts/themes'
import Button from '~/elements/Button'
import { media } from '~/utils/styling'

const BUTTON_WRAPPER_CLASSNAME = 'buttonWrapper'

const ModalPresentation = styled.div`
  text-align: center;
  h1 {
    margin-top: 0;
    margin-bottom: 32px;
    font-size: 22px;
    ${props => css`
      font-weight: ${props.theme.fontWeight.black};
    `};
  }
  p {
    line-height: 28px;
    margin-bottom: 19px;
  }
`

const ModalCTAPresentation = styled(ModalPresentation)`
  h1 {
    margin-bottom: -4px;
  }
  .${BUTTON_WRAPPER_CLASSNAME} {
    margin: 15px 0 -20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
    ${media.max.phone`
      flex-direction: column;
      margin-bottom: 10px;
    `};
  }
  button {
    margin: 10px;
  }
`

const ModalTextFieldPresentation = styled(ModalCTAPresentation)`
  h1 {
    margin-bottom: -2px;
  }
  input {
    font-size: 16px;
  }
  .${TEXT_FIELD_CLASSNAMES.BASE} {
    margin-top: 6px;
    ${media.customMin(500)`
      width: 400px;
    `};
  }
  .${BUTTON_WRAPPER_CLASSNAME} {
    flex-direction: column-reverse;
    ${media.customMin(500)`
      display: block;
    `};
  }
  ${media.customMin(500)`
    .${BUTTON_WRAPPER_CLASSNAME} {
      text-align: right;
      margin: -14px 66px -20px auto;
    }
  `};
`

export const Presentation = {
  Simple: () => (
    <ModalPresentation>
      <h1>{getTextKnob({ defaultText: 'Headline Text' })}</h1>
      <p>{getTextKnob({ placeholderTextLength: 27 })}</p>
    </ModalPresentation>
  ),
  WithCTA: () => (
    <ModalCTAPresentation>
      <h1>{getTextKnob({ defaultText: 'Headline Text' })}</h1>
      <p>{getTextKnob({ placeholderTextLength: 27 })}</p>
      <div className={BUTTON_WRAPPER_CLASSNAME}>
        <Button label='Button Text' size='big' onClick={() => {}} />
        <Button label='Cancel Text' appearance='secondary' size='big' onClick={() => {}} />
      </div>
    </ModalCTAPresentation>
  ),
  WithTextField: () => (
    <ModalTextFieldPresentation>
      <h1>{getTextKnob({ defaultText: 'Headline Text' })}</h1>
      <p>{getTextKnob({ placeholderTextLength: 20 })}</p>
      <TextField grey placeholder='Add Placeholder Text here' />
      <div className={BUTTON_WRAPPER_CLASSNAME}>
        <Button label='Text' appearance='ghost' onClick={() => {}} />
        <Button label='Text' onClick={() => {}} />
      </div>
    </ModalTextFieldPresentation>
  ),
  WithGraphic: () => (
    <ModalCTAPresentation>
      <Placeholder style={{ marginBottom: '20px' }} />
      <h1>{getTextKnob({ defaultText: 'Headline Text' })}</h1>
      <p>{getTextKnob({ placeholderTextLength: 20 })}</p>
      <div className={BUTTON_WRAPPER_CLASSNAME}>
        <Button label='Button Text' size='big' onClick={() => {}} />
        <Button label='Cancel Text' appearance='secondary' size='big' onClick={() => {}} />
      </div>
    </ModalCTAPresentation>
  ),
}

export class ModalApp extends PureComponent {
  static propTypes = {
    Component: PropTypes.func,
    buttonText: PropTypes.string,
  }
  static defaultProps = {
    Component: EnhancedModal,
    buttonText: 'Open Modal',
  }
  state = {
    open: false,
  }
  openModal = () => {
    this.setState({ open: true })
  }
  closeModal = () => {
    this.setState({ open: false })
  }
  render() {
    const { Component, buttonText } = this.props
    return (
      <div>
        <button onClick={this.openModal}>{buttonText}</button>
        <Component label='Header Label' open={this.state.open} onClose={this.closeModal}>
          <Presentation.Simple />
        </Component>
      </div>
    )
  }
}

const defaultProps = {
  open: false,
  theme: THEMES[DEFAULT_THEME_NAME],
  children: '',
  onClose: () => {},
}

const getParams = () => ({
  info: {
    propTablesExclude: getPropTablesExcludeList([
      Presentation.Simple,
      Presentation.WithCTA,
      Presentation.WithTextField,
      Presentation.WithGraphic,
      EnhancedModal,
      ModalApp,
    ]),
  },
})

storiesOf('Components/Modal', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(Modal, defaultProps))
  .addParameters(getParams())
  .add('usage in app', () => <ModalApp />, {
    info: {
      text: `
    Modals provide additional information in another layer. Modals can be closed manually by the user. Modals should be used sparingly.
    ~~~js
    class ModalApp extends PureComponent {
      state = {
        open: false,
      }
      openModal = () => {
        this.setState({ open: true })
      }
      closeModal = () => {
        this.setState({ open: false })
      }
      render() {
        return (
          <div>
            <button onClick={this.openModal}>Open Modal</button>
            <Modal
              label='Header Label'
              open={this.state.open}
              onClose={this.closeModal}
            >
              <div>some modal content</div>
            </Modal>
          </div>
        )
      }
    }
    ~~~
  `,
    },
  })

storiesOf('Components/Modal', module)
  .addParameters(getParams())
  .addDecorator(storyFn => (
    <div style={{ height: '400px' }}>
      <style>{'#storybook-theme-wrapper {display: none}'}</style>
      <EnhancedModal label='Header Label' open onClose={action('close modal')}>
        {storyFn()}
      </EnhancedModal>
    </div>
  ))
  .add('simple', () => <Presentation.Simple />)
  .add('with CTA', () => <Presentation.WithCTA />)
  .add('with TextField', () => <Presentation.WithTextField />)
  .add('with Graphic', () => <Presentation.WithGraphic />)
