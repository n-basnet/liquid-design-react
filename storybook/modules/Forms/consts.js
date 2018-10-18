export const FIELDS_GENERIC = [
  {
    label: 'Text Area label',
    placeholder: 'Add Placeholder Text here',
  },
  {
    label: 'Text Area label',
    placeholder: 'Add Placeholder Text here',
  },
  {
    label: 'Text Area label',
    placeholder: 'Add Placeholder Text here',
    style: { width: '100%' },
  },
  {
    label: 'Text Area label',
    placeholder: 'Add Placeholder Text here',
  },
  {
    label: 'Text Area label',
    placeholder: 'Add Placeholder Text here',
  },
  {
    label: 'Text Area label',
    placeholder: 'Add Placeholder Text here',
    multiline: true,
    style: { width: '100%' },
  },
]

export const FIELDS_REGISTER = [
  {
    required: true,
    label: 'First Name*',
    placeholder: 'Add your Name here',
  },
  {
    required: true,
    label: 'Last Name*',
    placeholder: 'Add your Name here',
  },
  {
    required: true,
    label: 'E-Mail Address*',
    type: 'email',
    placeholder: 'john.doe@internet.com',
    style: { width: '100%' },
  },
  {
    required: true,
    label: 'Password*',
    type: 'password',
    placeholder: 'at least 8 characters',
  },
  {
    required: true,
    label: 'Confirm Password*',
    type: 'password',
    placeholder: 'at least 8 characters',
  },
]

export const FIELDS_LOGIN = [
  {
    required: true,
    label: 'E-Mail Address*',
    type: 'email',
    placeholder: 'john.doe@internet.com',
    style: { width: '100%' },
  },
  {
    required: true,
    label: 'Password*',
    type: 'password',
    placeholder: 'Enter your password',
    style: { width: '100%' },
  },
]

export const FIELDS_PROFILE_BOTTOM = [
  {
    label: 'Street',
    placeholder: 'Add street name',
    style: { width: '100%' },
  },
  {
    label: 'Zip Code',
    placeholder: 'z.B. 123456',
  },
  {
    label: 'City',
    placeholder: 'Example City',
  },
  {
    type: 'select',
    label: 'Select your Region',
    options: [{ name: 'Region 1', id: '1' }, { name: 'Region 2', id: '2' }],
  },
  {
    type: 'select',
    label: 'Select your Country',
    options: [{ name: 'Country 1', id: '1' }, { name: 'Country 2', id: '2' }],
  },
]

export const FIELDS_PROFILE_TOP = {
  firstName: {
    label: 'First Name',
    placeholder: 'Add your Name here',
    style: { width: '100%' },
  },
  lastName: {
    label: 'Last Name',
    placeholder: 'Add your Name here',
    style: { width: '100%' },
  },
  email: {
    label: 'E-Mail Address',
    type: 'email',
    placeholder: 'john.doe@internet.com',
    style: { width: '100%' },
  },
  password: {
    label: 'Password',
    placeholder: 'at least 8 characters',
    type: 'password',
    style: { width: '100%' },
  },
}

export const MOBILE_BREAKPOINT = 560
