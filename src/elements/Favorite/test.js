import Favorite, { FavoriteWrapper } from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Favorite', () => {
  const getFavoriteWrapper = getWrapper(Favorite)

  it('handles click', () => {
    const wrapper = getFavoriteWrapper()

    expect(wrapper.find(FavoriteWrapper).prop('isAnimating')).toEqual(false)

    wrapper.find(Favorite).simulate('click')

    expect(wrapper.find(FavoriteWrapper).prop('isAnimating')).toEqual(true)
  })

  everyComponentTestSuite(getFavoriteWrapper, Favorite, 'Favorite')
})
