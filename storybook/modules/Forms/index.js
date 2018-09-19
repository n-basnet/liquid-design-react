import React from 'react'
import { storiesOf } from '@storybook/react'

import { getBackgroundWrapper, getPropTablesExcludeList, getStoryMDLink } from '../../helpers'
import {
  FIELDS_GENERIC,
  FIELDS_REGISTER,
  FIELDS_LOGIN,
  FIELDS_PROFILE_BOTTOM,
  MOBILE_BREAKPOINT,
} from './consts'
import { media } from '~/utils/styling'

import FormsApp from './FormsApp'

const getFormAppComponent = ({ type, onWhiteBackground, isProfile }) => {
  const formApps = {
    generic: () => (
      <FormsApp
        onWhiteBackground={onWhiteBackground}
        headerText='Form Headline'
        fields={FIELDS_GENERIC}
        acceptButtonText='Send'
      />
    ),
    register: () => (
      <FormsApp
        onWhiteBackground={onWhiteBackground}
        headerText='Add your Information to Register'
        fields={FIELDS_REGISTER}
        acceptButtonText='Register'
        checkboxText='I accept the '
        checkboxLinkText='Terms & Conditions'
      />
    ),
    login: () => (
      <FormsApp
        onWhiteBackground={onWhiteBackground}
        headerText='Login to your account'
        fields={FIELDS_LOGIN}
        acceptButtonText='Login'
        checkboxText='Keep me logged in'
      />
    ),
    profile: () => (
      <FormsApp
        onWhiteBackground={onWhiteBackground}
        headerText='Your Profile'
        fields={FIELDS_PROFILE_BOTTOM}
        acceptButtonText='Save'
        isProfile
      />
    ),
  }
  return formApps[type]
}

const styleCSSString = media.customMax(MOBILE_BREAKPOINT)`
  padding-left: 15px;
  padding-right: 15px;
`

const getBackgroundWrapperDecorator = backgroundColor =>
  getBackgroundWrapper({
    style: { backgroundColor },
    styleCSSString,
  })

const getParameters = () => ({
  info: {
    source: false,
    propTablesExclude: getPropTablesExcludeList([FormsApp]),
  },
})

const getInfoMD = () => ({
  info: {
    text: `
      Forms can be constructed with ${getStoryMDLink('TextField')}, ${getStoryMDLink(
    'Checkbox'
  )}, ${getStoryMDLink('Button', { storyName: 'Button/Primary' })}, and ${getStoryMDLink(
    'Dropdown'
  )} elements. The logic of the forms is up the to user, this library provides just the UI components.
    `,
  },
})

storiesOf('Modules/Forms/Examples', module)
  .addParameters(getParameters())
  .addDecorator(getBackgroundWrapperDecorator('#f9f9fc'))
  .add('generic', getFormAppComponent({ type: 'generic' }), getInfoMD())
  .add('register', getFormAppComponent({ type: 'register' }), getInfoMD())
  .add('login', getFormAppComponent({ type: 'login' }), getInfoMD())
  .add('profile', getFormAppComponent({ type: 'profile', isProfile: true }), getInfoMD())

storiesOf('Modules/Forms/Examples (White)', module)
  .addParameters(getParameters())
  .addDecorator(getBackgroundWrapperDecorator('#fff'))
  .add('generic', getFormAppComponent({ type: 'generic', onWhiteBackground: true }), getInfoMD())
  .add('register', getFormAppComponent({ type: 'register', onWhiteBackground: true }), getInfoMD())
  .add('login', getFormAppComponent({ type: 'login', onWhiteBackground: true }), getInfoMD())
  .add(
    'profile',
    getFormAppComponent({ type: 'profile', isProfile: true, onWhiteBackground: true }),
    getInfoMD()
  )
