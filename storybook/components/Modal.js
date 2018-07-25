import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { getBackgroundWrapper } from '../helpers'
import { Modal } from '~'

const ModalPresentation = styled.div`
  text-align: center;
  h1 {
    margin-top: 0;
    margin-bottom: 32px;
    font-size: 22px;
    font-weight: 900;
  }
  p {
    line-height: 28px;
    margin-bottom: 19px;
  }
`

const Presentation = {
  Simple: () => (
    <ModalPresentation>
      <h1>Headline Text</h1>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo.
      </p>
    </ModalPresentation>
  ),
}

class ModalApp extends React.Component {
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
    class ModalApp extends React.Component {
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
