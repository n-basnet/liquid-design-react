import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import {
  getBackgroundWrapper,
  includeComponentInPropTable,
  getPropTablesExcludeList,
  getSnippetTemplate,
  Fragment,
} from '../helpers'
import EnhancedStepProgressBar, {
  StepProgressBar,
} from '../../src/components/StepProgressBar'
import Button from '../../src/elements/Button'
import { times } from '../../src/utils/misc'

const getDefaultProps = () => ({
  steps: times(4).map(v => ({
    name: 'Step label',
  })),
})

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`

class StepProgressBarApp extends PureComponent {
  static propTypes = {
    isControlledExternally: PropTypes.bool,
  }

  static defaultProps = {
    isControlledExternally: false,
  }

  state = {
    current: 1,
  }

  updateCurrent = current => this.setState({ current })
  render() {
    const { current } = this.state
    const { isControlledExternally } = this.props
    const { steps, ...props } = getDefaultProps()
    return (
      <Fragment>
        <EnhancedStepProgressBar
          current={current}
          steps={steps}
          onUpdate={isControlledExternally ? undefined : this.updateCurrent}
          {...props}
          {...this.props}
        />
        {isControlledExternally && (
          <ButtonsContainer>
            <Button
              disabled={current < 0}
              onClick={() => this.updateCurrent(current - 1)}
            >
              {current === 0 ? 'reset' : 'previous'}
            </Button>
            <Button
              disabled={current >= steps.length}
              onClick={() => this.updateCurrent(current + 1)}
            >
              {current >= steps.length - 1 ? 'complete' : 'next'}
            </Button>
          </ButtonsContainer>
        )}
      </Fragment>
    )
  }
}

const getSnippet = (propsString = '', disabledSteps) =>
  getSnippetTemplate(`
  <StepProgressBar
    current={1}
    steps={[
      { name: 'Step label 1' },
      { name: 'Step label 2' },
      { name: 'Step label 3'${disabledSteps ? ', disabled: true' : ' '}},
      { name: 'Step label 4'${disabledSteps ? ', disabled: true' : ' '}},
    ]}${propsString}
  />
`)

storiesOf('Components/StepProgressBar', module)
  .addDecorator(getBackgroundWrapper())
  .addDecorator(includeComponentInPropTable(StepProgressBar, getDefaultProps()))
  .addParameters({
    info: {
      propTablesExclude: getPropTablesExcludeList([
        EnhancedStepProgressBar,
        StepProgressBarApp,
      ]),
      excludedPropTypes: ['width', 'className'],
    },
  })
  .add('default', () => <StepProgressBarApp />, getSnippet())
  .add('controlled externally', () => (
    <StepProgressBarApp isControlledExternally />
  ))
  .add(
    'disabled',
    () => <StepProgressBarApp disabled />,
    getSnippet(`
    disabled`),
  )
  .add(
    'with disabled steps',
    () => {
      const { steps } = getDefaultProps()
      steps[steps.length - 1].disabled = true
      steps[steps.length - 2].disabled = true
      return <StepProgressBarApp steps={steps} />
    },
    getSnippet(undefined, true),
  )
