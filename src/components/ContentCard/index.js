import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { getBackgroundImage } from '~/utils/styling'
import Card from '~/components/Card'
import { Flex } from '~/components/primitives/Flex'
import Label from '~/components/ContentCard/Label'

const ImageWrapper = styled.div`
  ${getBackgroundImage};
  border-radius: 50%;
  max-width: 200px;
  min-height: 200px;
  margin: auto;
`

const TitleWrapper = styled.h1`
  margin: 0 0 20px;
`

const DescriptionWrapper = styled.div`
  margin: 20px 0;
`

const FeaturedWrapper = styled.div`
  ${props => css`
    color: ${props.theme.colors.primary};
  `}
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`

FeaturedWrapper.defaultProps = {
  theme: DEFAULT_THEME,
}

const ContentCard = ({
  title,
  labels = [],
  imagePath,
  description,
  featured,
  stacked,
  active,
}) =>
  <Card active={active} stacked={stacked} center>
    <TitleWrapper>{title}</TitleWrapper>
    {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
    <ImageWrapper src={imagePath || ''} />
    {featured && <FeaturedWrapper>{featured}</FeaturedWrapper>}
    <Flex spread mt='20px'>
      {labels.map((label, i) => <Label {...label} key={i} isRight={i === 1} />)}
    </Flex>
  </Card>

ContentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  featured: PropTypes.string,
  imagePath: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.shape(Label.propTypes)),
  stacked: PropTypes.bool,
  active: PropTypes.bool,
}

export default ContentCard
