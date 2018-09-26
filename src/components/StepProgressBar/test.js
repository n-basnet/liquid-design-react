import { Glyph } from '~/elements/Icon'
import { StepProgressBar, SingleStepNameWrapper } from '~/components/StepProgressBar'
import { getWrapper, everyComponentTestSuite } from '~/utils/testUtils'
import { getGlyphName } from '~/components/StepProgressBar/helpers'

const defaultProps = {
  steps: [{ name: 'Step 1' }, { name: 'Step 1' }, { name: 'Step 3' }],
}

describe('StepProgressBar', () => {
  const getStepProgressBarWrapper = getWrapper(StepProgressBar, defaultProps)

  it('renders n steps', () => {
    const wrapper = getStepProgressBarWrapper()
    expect(wrapper.find(SingleStepNameWrapper).length).toEqual(defaultProps.steps.length)
  })

  it('sets glyph names', () => {
    const current = 1
    const wrapper = getStepProgressBarWrapper({ current })

    const currentGlyphName = getGlyphName({ current: true })
    const comingUpGlyphName = getGlyphName({ comingUp: true })
    const doneGlyphName = getGlyphName({ done: true })

    const getGlyphPropAt = (propName, index) =>
      wrapper
        .find(Glyph)
        .at(index)
        .prop(propName)

    expect(getGlyphPropAt('name', current - 1)).toEqual(doneGlyphName)
    expect(getGlyphPropAt('name', current)).toEqual(currentGlyphName)
    expect(getGlyphPropAt('name', current + 1)).toEqual(comingUpGlyphName)
  })

  it('handles disabled prop', () => {
    const wrapper = getStepProgressBarWrapper({ disabled: true })
    wrapper.find(Glyph).forEach(node => expect(node.prop('disabled')).toBe(true))
  })

  it('renders a disabled step', () => {
    const wrapper = getStepProgressBarWrapper({
      steps: [{ name: 'Step 1' }, { name: 'Step 2', disabled: true }],
    })
    expect(
      wrapper
        .find(Glyph)
        .first()
        .prop('disabled')
    ).toBe(false)
    expect(
      wrapper
        .find(Glyph)
        .at(1)
        .prop('disabled')
    ).toBe(true)
  })

  everyComponentTestSuite(getStepProgressBarWrapper, StepProgressBar, 'StepProgressBar')
})
