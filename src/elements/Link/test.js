import Link from '.'
import { Glyph } from '../../elements/Icon'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Link', () => {
  const defaultProps = {
    children: 'Label Text',
    icon: 'arrowRight',
  }
  const getLinkWrapper = getWrapper(Link, defaultProps)

  it('renders the link text', () => {
    expect(
      getLinkWrapper()
        .find(Link)
        .text(),
    ).toEqual(defaultProps.children)
  })

  it('renders a correct icon', () => {
    expect(
      getLinkWrapper()
        .find(Glyph)
        .prop('name'),
    ).toEqual(defaultProps.icon)
  })

  everyComponentTestSuite(getLinkWrapper, Link, 'Link')
})
