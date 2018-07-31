import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { getBackgroundWrapper, getTextKnob } from '../helpers'
import { Modal } from '~'

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

const Presentation = {
  Simple: () => (
    <ModalPresentation>
      <h1>{getTextKnob({ defaultText: 'Headline Text' })}</h1>
      <p>{getTextKnob({ placeholderTextLength: 27 })}</p>
    </ModalPresentation>
  ),
}

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
        <button onClick={this.openModal}>open modal</button>
        <Modal
          label='Header Label'
          open={this.state.open}
          onClose={this.closeModal}
        >
          <Presentation.Simple />
        </Modal>
      </div>
    )
  }
}

storiesOf('Components/Modal', module)
  .addDecorator(getBackgroundWrapper())
  .addParameters({
    info: {
      source: false,
      propTables: [],
      propTablesExclude: [Presentation.Simple, ModalApp, Modal],
    },
  })
  .add('simple', () => (
    <div style={{ height: '400px' }}>
      <style>{'#storybook-theme-wrapper {display: none}'}</style>
      <Modal label='Header Label' open onClose={action('close modal')}>
        <Presentation.Simple />
      </Modal>
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
            <button onClick={this.openModal}>open modal</button>
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
