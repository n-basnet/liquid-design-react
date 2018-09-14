import LightBox from '.'
import Modal from '~/components/Modal'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('LightBox', () => {
  const children = 'Some text'
  const defaultProps = { open: true, children, onClose: () => {} }
  const getLightBoxWrapper = getWrapper(LightBox, defaultProps)

  it('renders a style tag when open', () => {
    const wrapper = getLightBoxWrapper()
    expect(wrapper.find('style').length).toEqual(1)
  })

  // LightBox is a Modal with added styling, so the component to perform the tests on will be Modal
  everyComponentTestSuite(getLightBoxWrapper, Modal, 'LightBox')
})
