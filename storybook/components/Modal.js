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
import { default as EnhancedModal, Modal } from '~/components/Modal'
import { THEMES, DEFAULT_THEME_NAME } from '~/utils/consts/themes'
import Button from '~/elements/Button'

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
  > div {
    margin: 25px 0 -10px 0;
  }
  button {
    margin: 0 10px;
  }
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
      <div>
        <Button label='Cancel Text' appearance='secondary' size='big' onClick={() => {}} />
        <Button label='Button Text' size='big' onClick={() => {}} />
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

storiesOf('Components/Modal', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(
    includeComponentInPropTable(Modal, {
      open: false,
      theme: THEMES[DEFAULT_THEME_NAME],
      children: '',
      onClose: () => {},
    })
  )
  .addParameters({
    info: {
      propTables: [],
      propTablesExclude: getPropTablesExcludeList([Presentation.Simple, ModalApp, EnhancedModal]),
    },
  })
  .add('simple', () => (
    <div style={{ height: '400px' }}>
      <style>{'#storybook-theme-wrapper {display: none}'}</style>
      <EnhancedModal label='Header Label' open onClose={action('close modal')}>
        <Presentation.Simple />
      </EnhancedModal>
    </div>
  ))
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
