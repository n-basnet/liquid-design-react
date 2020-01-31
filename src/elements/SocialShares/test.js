import SocialShare, { SocialShareLabel } from '.'
import { Glyph } from '../../elements/Icon'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('SocialShare', () => {
  const defaultProps = {
    hasLabel: true,
    type: 'facebook',
  }
  const getSocialShareWrapper = getWrapper(SocialShare, defaultProps)
  it('renders proper label and icon', () => {
    const wrapper = getSocialShareWrapper()

    expect(wrapper.find(SocialShareLabel).text()).toEqual('Facebook')
    expect(wrapper.find(Glyph).prop('name')).toEqual('facebook')
  })

  everyComponentTestSuite(getSocialShareWrapper, SocialShare, 'SocialShare')
})
