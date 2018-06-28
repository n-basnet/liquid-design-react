import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { getBackgroundImage } from '~/utils/styling'
import { Flex } from '~/components/primitives/Flex'
import Label from '~/components/ContentCard/Label'

const ContentCardWrapper = styled.div`
  ${props => props.active && css`
    box-shadow: ${props.theme.doubleBoxShadow};
  `}
  ${props => css`
    font-family: ${props.theme.fontFamily};
    border-radius: ${props.theme.borderRadius};
    background-color: ${props.theme.colors.white};
    transition: ${props.theme.transition};
    &:hover {
      box-shadow: ${props.theme.boxShadow};
    };
  `}
  max-width: 330px;
  padding: 20px;
  text-align: center;
`

ContentCardWrapper.defaultProps = {
  theme: DEFAULT_THEME,
}

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

export const ContentCard = ({
  title,
  labels = [],
  imagePath,
  description,
  featured,
  active,
}) =>
  <ContentCardWrapper active={active}>
    <TitleWrapper>{title}</TitleWrapper>
    {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
    <ImageWrapper src={imagePath || ''} />
    {featured && <FeaturedWrapper>{featured}</FeaturedWrapper>}
    <Flex spread mt='20px'>
      {labels.map((label, i) => <Label {...label} key={i} isRight={i === 1} />)}
    </Flex>
  </ContentCardWrapper>

ContentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  featured: PropTypes.string,
  imagePath: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.shape(Label.propTypes)),
  active: PropTypes.bool,
}
