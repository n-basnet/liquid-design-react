import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import system from 'system-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import { borderRadius, fontFamily, transition, boxShadow, doubleBoxShadow } from '~/utils/consts/rules'
import COLORS from '~/utils/consts/colors'
import { getBackgroundImage } from '~/utils/styling'
import { Flex } from '~/components/styled/Flex'
import Label from '~/components/ContentCard/Label'

const ContentCardWrapper = system(
  {blacklist: ['active']},
  props => ({
    ...props.active && {boxShadow: doubleBoxShadow},
  }),
  {
    maxWidth: '330px',
    padding: '20px',
    fontFamily,
    textAlign: 'center',
    borderRadius,
    backgroundColor: COLORS.WHITE,
    transition,
    '&:hover': {
      boxShadow,
    },
  }
)

const ImageWrapper = system(
  props => getBackgroundImage(props.src),
  {
    borderRadius: '50%',
    maxWidth: '200px',
    minHeight: '200px',
    margin: 'auto',
  }
)

const TitleWrapper = styled.h1`
  margin: 0 0 20px;
`

const DescriptionWrapper = styled.div`
  margin: 20px 0;
`

const FeaturedWrapper = system(
  props => ({
    color: props.theme.colors.primary,
  }),
  {
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  }
)

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
