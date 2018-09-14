import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  getBackgroundWrapper,
  getTextKnob,
  includeComponentInPropTable,
  getPropTablesExcludeList,
} from '../helpers'
import { default as EnhancedLightBox, LightBox } from '~/modules/LightBox'
import { Presentation, ModalApp } from '../components/Modal'

const getDefaultProps = (open = true) => ({
  open,
  label: getTextKnob({ defaultText: 'Header Label' }),
  onClose: action('close lightbox'),
  children: '',
})

storiesOf('Modules/LightBox', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(LightBox, getDefaultProps(false)))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        Presentation.WithCTA,
        ModalApp,
        EnhancedLightBox,
      ]),
    },
  })
  .add('simple', () => (
    <div style={{ height: '400px' }}>
      <style>{'#storybook-theme-wrapper {display: none}'}</style>
      <EnhancedLightBox {...getDefaultProps()}>
        <Presentation.WithCTA />
      </EnhancedLightBox>
    </div>
  ))
  .add('usage in app', () => <ModalApp Component={EnhancedLightBox} buttonText='Open LightBox' />, {
    info: {
      text: `
    Lightboxes are used to set the users focus on a certain interface element, usually an enlarged graphic or photograph. It’s also possible to display other modules within a lightbox as modals.

    ~~~js
    class LightBoxApp extends PureComponent {
      state = {
        open: false,
      }
      openLightBox = () => {
        this.setState({ open: true })
      }
      closeModal = () => {
        this.setState({ open: false })
      }
      render() {
        return (
          <div>
            <button onClick={this.openLightBox}>Open LightBox</button>
            <LightBox
              label='Header Label'
              open={this.state.open}
              onClose={this.closeLightBox}
            >
              <div>some content</div>
            </LightBox>
          </div>
        )
      }
    }
    ~~~
  `,
    },
  })
