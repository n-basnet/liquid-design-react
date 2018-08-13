import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { getBackgroundImage } from '~/utils/styling'
import Card from '~/elements/Card'
import Badge from '~/components/Badge'
import Placeholder from '~/components/aux/Placeholder'
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
  font-weight: ${props => props.theme.fontWeight.black};
`

const DescriptionWrapper = styled.div`
  margin-top: 5px;
  font-size: 12px;
`

const FeaturedWrapper = styled.div`
  ${props => css`
    font-weight: ${props.theme.fontWeight.black};
    color: ${props.theme.colors.primary.base};
    font-weight: ${props.theme.fontWeight.black};
  `};
  margin-top: 20px;
  font-size: 22px;
`

const LabelsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${props => css`
    margin-top: ${props.featured ? 0 : 20}px;
  `};
  strong {
    font-weight: ${props => props.theme.fontWeight.black};
  }
`

const ContentCard = ({
  title,
  labels = [],
  imagePath,
  description,
  featured,
  stacked,
  active,
  badge,
}) => (
  <Card
    active={active}
    stacked={stacked}
    css={badge && 'position: relative; padding-bottom: 34px'}
    center
  >
    <div style={{ marginBottom: description ? '16px' : '43px' }}>
      <TitleWrapper>{title}</TitleWrapper>
      {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
    </div>
    {imagePath ? <ImageWrapper src={imagePath} /> : <Placeholder />}
    {featured && <FeaturedWrapper>{featured}</FeaturedWrapper>}
    <LabelsWrapper featured={featured}>
      {labels.map((label, i) => <Label {...label} key={i} />)}
    </LabelsWrapper>
    {badge && (
      <Badge
        icon={badge.icon || badge.iconRight}
        iconOnRight={!!badge.iconRight}
        text={badge.text}
        onCard
      />
    )}
  </Card>
)

ContentCard.propTypes = {
  /** main text to be displayed */
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  /** a special text to be displayed below the image */
  featured: PropTypes.string,
  imagePath: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.shape(Label.propTypes)),
  /** stacked style - suggesting multiple items */
  stacked: PropTypes.bool,
  /** active style - with drop shadow */
  active: PropTypes.bool,
  /** Badge component props, to be attached to the element's bottom */
  badge: PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    iconRight: PropTypes.string,
  }),
}

ContentCard.defaultProps = {
  description: null,
  featured: null,
  imagePath: null,
  labels: [],
  stacked: false,
  active: false,
  badge: null,
}

export default ContentCard
