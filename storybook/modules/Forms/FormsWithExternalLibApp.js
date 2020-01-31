import React from 'react'
import { Form, Field } from 'react-final-form'
import { action } from '@storybook/addon-actions'
import styled, { css, keyframes } from 'styled-components'

import { getStoryMDLink, Fragment } from '../../helpers'
import { TextField, Button } from '../../../src'

const rotation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
`

const Spinner = styled.div`
  height: 22px;
  width: 22px;
  position: absolute;
  right: 0;
  top: 0;
  animation: ${rotation} 0.6s infinite linear;
  border-radius: 100%;
  ${props => css`
    border: 4px solid ${props.theme.colors.sensitiveGrey.base};
    border-top: 4px solid ${props.theme.colors.primary.base};
  `};
`

export const propTablesExclude = [Form]

export const storyInfo = {
  info: {
    text: `${getStoryMDLink(
      'TextField',
    )} is just a wrapper for \`input\`/\`textfield\` HTML elements with some styling. It can easily be combined with standard React form libraries.

In this example, \`react-final-form\` is used (usernames John, Paul, George or Ringo will fail async validation.):

~~~js
<Form
  render={({ handleSubmit, pristine, invalid, validating }) => (
    <form>
      {validating && <Spinner />}
      {[
        { name: 'username', label: 'Username', validate: validateUsername },
        { name: 'email', label: 'E-Mail address', validate: validateEmail },
      ].map(({ name, label, validate }, i) => (
        <Field key={i} name={name} validate={validate}>
          {({ input, meta }) => (
            <TextField
              label={label}
              error={meta.touched && meta.error}
              {...input}
            />
          )}
        </Field>
      ))}

      <Button type='submit' disabled={pristine || invalid}>
        Submit
      </Button>
    </form>
  )}
/>
~~~

    `,
  },
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const validateUsername = async value => {
  if (!value) {
    return 'Required'
  }
  await sleep(500)
  if (
    ~['john', 'paul', 'george', 'ringo'].indexOf(value && value.toLowerCase())
  ) {
    return 'Username already taken'
  }
}
const validateEmail = text =>
  /.+@.+\..+/.test(text) ? undefined : 'Invalid email address'

const ExampleForm = () => (
  <Form
    onSubmit={action('submit form')}
    render={({ handleSubmit, pristine, invalid, validating }) => (
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        {validating && <Spinner />}
        {[
          { name: 'username', label: 'Username', validate: validateUsername },
          { name: 'email', label: 'E-Mail address', validate: validateEmail },
        ].map(({ name, label, validate }, i) => (
          <Fragment key={i}>
            <Field name={name} validate={validate}>
              {({ input, meta }) => (
                <TextField
                  label={label}
                  error={meta.touched && meta.error}
                  {...input}
                />
              )}
            </Field>
            <br />
          </Fragment>
        ))}

        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
)

export default ExampleForm
