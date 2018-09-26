import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import Label from '~/elements/Label'
import Button from '~/elements/Button'
import SearchBar from '~/components/SearchBar'
import HeaderWrapper from '~/modules/Header/HeaderWrapper'
import LabelsWrapper from '~/modules/Header/LabelsWrapper'
import { media } from '~/utils/styling'
import attachClassName from '~/components/aux/hoc/attachClassName'

const IconsWrapper = styled.div`
  padding: 0 21px;
  line-height: 0;
  .${ICON_CLASSNAME} {
    :not(:last-child) {
      margin-right: 30px;
      ${media.max.phone`
        margin-right: 5px;
    `};
    }
  }
  ${media.max.phone`
    padding: 0 10px 0 0;
  `};
`

const ButtonWrapper = styled.div`
  padding-right: 15px;
  button:first-child {
    ${media.max.phone`
      display: none;
    `};
  }
  button:nth-child(2) {
    ${media.min.phone`
      display: none;
    `};
  }
  }
`

const VerticalLine = styled.div`
  width: 1px;
  min-height: 60px;
  background: ${props => props.theme.colors.white.base};
  opacity: 0.1;
`

// IEfix solves the IE flexbox issue

const IEfix = styled.div`
  width: 1px;
  min-height: 60px;
`

const SearchBarWrapper = styled.div`
  flex: 1;
  padding-left: 8px;
  .${ICON_CLASSNAME} {
    svg {
      width: 20px;
      height: 20px;
      fill: white;
    }
  }
  input {
    margin-left: -5px;
    color: white;
    ::placeholder {
      color: white;
    }
    ${media.max.phone`
      min-width: 150px;
      max-width: 150px;
    `};
  }
  &:hover {
    .${ICON_CLASSNAME} {
      svg {
        fill: white;
      }
    }
    input {
      ::placeholder {
        color: white;
      }
    }
  }
  ${media.max.phone`
    padding-left: 0;
  `};
`

const Header = ({
  buttonIcon,
  buttonLabel,
  buttonOnClick,
  labelOne,
  labelTwo,
  withButton,
  withIcons,
  withText,
  searchBarHandleSubmit,
  searchBarOptions,
  notificationOnClick,
  infoOnClick,
  settingsOnClick,
  ...props
}) => (
  <HeaderWrapper {...props}>
    <Glyph
      color='secondary.base'
      name='logo'
      size={42}
      style={{ marginRight: '19px', marginLeft: '19px' }}
    />
    <SearchBarWrapper>
      <SearchBar ghost options={searchBarOptions} handleSubmit={searchBarHandleSubmit} />
    </SearchBarWrapper>
    <IEfix />
    {withIcons && (
      <IconsWrapper>
        <Glyph name='bell' color='white.base' size={20} onClick={notificationOnClick} />
        <Glyph name='info' color='white.base' size={20} onClick={infoOnClick} />
        <Glyph color='white.base' name='settings' size={20} onClick={settingsOnClick} />
      </IconsWrapper>
    )}
    {withText && (
      <Fragment>
        <VerticalLine />
        <LabelsWrapper>
          <Label>{labelOne}</Label>
          <Label>{labelTwo}</Label>
        </LabelsWrapper>
      </Fragment>
    )}
    {withButton && (
      <ButtonWrapper>
        <Button
          appearance='secondary'
          icon={buttonIcon}
          label={buttonLabel}
          onClick={buttonOnClick}
        />
        <Button appearance='secondary' icon={buttonIcon} onClick={buttonOnClick} />
      </ButtonWrapper>
    )}
  </HeaderWrapper>
)

Header.propTypes = {
  buttonIcon: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonOnClick: PropTypes.func,
  labelOne: PropTypes.string,
  labelTwo: PropTypes.string,
  withButton: PropTypes.bool,
  withIcons: PropTypes.bool,
  withText: PropTypes.bool,
  notificationOnClick: PropTypes.func,
  infoOnClick: PropTypes.func,
  searchBarHandleSubmit: PropTypes.func,
  searchBarOptions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  settingsOnClick: PropTypes.func,
}

Header.defaultProps = {
  buttonIcon: null,
  buttonLabel: null,
  buttonOnClick: null,
  labelOne: null,
  labelTwo: null,
  withButton: false,
  withIcons: false,
  withText: false,
  searchBarOptions: [],
  searchBarHandleSubmit: null,
  notificationOnClick: null,
  infoOnClick: null,
  settingsOnClick: null,
}

const { Component } = attachClassName(Header)

export default Component