import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { getBackgroundImage } from '~/utils/styling'
import Card from '~/components/Card'
import Badge from '~/components/Badge'
import Placeholder from '~/components/aux/Placeholder'
import { Flex } from '~/components/primitives/Flex'
import Label from '~/components/ContentCard/Label'

const ImageWrapper = styled.div`
  ${getBackgroundImage};
  border-radius: 50%;
  max-width: 150px;
  min-height: 150px;
  margin: auto;
`

const TitleWrapper = styled.h1`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`

const DescriptionWrapper = styled.div`
  margin-top: 5px;
  font-size: 12px;
`

const FeaturedWrapper = styled.div`
  ${props => css`
    color: ${props.theme.colors.primary};
  `}
  margin-top: 20px;
  font-size: 22px;
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
  badge,
}) =>
  <Card
    active={active}
    stacked={stacked}
    css={badge && 'position: relative;'}
    center
  >
    <div style={{marginBottom: description ? '16px' : '43px'}}>
      <TitleWrapper>{title}</TitleWrapper>
      {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
    </div>
    {imagePath
      ? <ImageWrapper src={imagePath} />
      : <Placeholder />
    }
    {featured && <FeaturedWrapper>{featured}</FeaturedWrapper>}
    <Flex spread mt={featured ? '0px' : '20px'}>
      {labels.map((label, i) => <Label {...label} key={i} isRight={i === 1} />)}
    </Flex>
    {badge && (
      <Badge
        icon={badge.icon || badge.iconRight}
        iconOnRight={!!badge.iconRight}
        text={badge.text}
        onCard
      />
    )}
  </Card>

ContentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  featured: PropTypes.string,
  imagePath: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.shape(Label.propTypes)),
  stacked: PropTypes.bool,
  active: PropTypes.bool,
  badge: PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    iconRight: PropTypes.string,
  }),
}

export default ContentCard
