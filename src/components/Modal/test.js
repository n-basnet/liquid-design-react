import Modal from '.'
import ModalContent from './ModalContent'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('ModalContent', () => {
  const defaultProps = {
    children: 'Modal content',
    label: 'Modal label',
    onClose: v => v,
    theme: {},
    open: true,
  }
  const getModalWrapper = getWrapper(Modal, defaultProps)

  it('renders content and label', () => {
    const content = getModalWrapper()
      .find(ModalContent)
      .html()
    expect(content).toMatch(defaultProps.children)
    expect(content).toMatch(defaultProps.label)
  })

  everyComponentTestSuite(getModalWrapper, Modal, 'Modal')
})
