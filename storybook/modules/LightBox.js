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

const params = {
  info: {
    propTablesExclude: getPropTablesExcludeList([
      Presentation.Simple,
      Presentation.WithCTA,
      Presentation.WithTextField,
      Presentation.WithGraphic,
      ModalApp,
      EnhancedLightBox,
    ]),
  },
}

storiesOf('Modules/LightBox', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(LightBox, getDefaultProps(false)))
  .addParameters(params)
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
      closeLightBox = () => {
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

storiesOf('Modules/LightBox', module)
  .addParameters(params)
  .addDecorator(storyFn => (
    <div style={{ height: '400px' }}>
      <style>{'#storybook-theme-wrapper {display: none}'}</style>
      <EnhancedLightBox {...getDefaultProps()}>{storyFn()}</EnhancedLightBox>
    </div>
  ))
  .add('simple', () => <Presentation.Simple />)
  .add('with CTA', () => <Presentation.WithCTA />)
  .add('with TextField', () => <Presentation.WithTextField />)
  .add('with Graphic', () => <Presentation.WithGraphic />)
