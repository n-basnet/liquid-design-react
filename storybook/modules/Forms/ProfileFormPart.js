import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getTextKnob } from '../../helpers'
import { action } from '@storybook/addon-actions'

import { TextField, Headline, Button } from '~'
import { HEADLINE_CLASSNAME } from '~/elements/Headline'
import Placeholder from '~/components/aux/Placeholder'
import { media } from '~/utils/styling'
import { FIELDS_PROFILE_TOP, MOBILE_BREAKPOINT } from './consts'
import FlexRowsWrapper from './FlexRowsWrapper'

const CLASSNAMES = {
  placeholderWrapper: 'placeholderWrapper',
  nameFieldsWrapper: 'nameFieldsWrapper',
  passwordWrapper: 'passwordWrapper',
  buttonWrapper: 'buttonWrapper',
}

const ProfileFormPartWrapper = styled.div`
  .${HEADLINE_CLASSNAME}--H6 {
    margin-bottom: 20px;
  }
  .${CLASSNAMES.buttonWrapper} {
    text-align: right;
  }
  ${media.customMin(MOBILE_BREAKPOINT)`
    .${CLASSNAMES.placeholderWrapper} {
      width: 33%;
    }
    .${CLASSNAMES.nameFieldsWrapper} {
      width: 66%;
    }
    .${CLASSNAMES.passwordWrapper} {
      width: 70%;
    }
    .${CLASSNAMES.buttonWrapper} {
      width: 30%;
    }
  `};
`

const ProfileFormPart = ({ fieldProps }) => (
  <ProfileFormPartWrapper>
    <FlexRowsWrapper style={{ marginBottom: '-3px' }}>
      <div className={CLASSNAMES.placeholderWrapper}>
        <Placeholder size={120} white />
      </div>
      <FlexRowsWrapper nested className={CLASSNAMES.nameFieldsWrapper}>
        {[FIELDS_PROFILE_TOP.firstName, FIELDS_PROFILE_TOP.lastName].map((field, i) => (
          <TextField key={i} style={field.style} {...fieldProps} {...field} />
        ))}
      </FlexRowsWrapper>
    </FlexRowsWrapper>
    <FlexRowsWrapper>
      <TextField {...fieldProps} {...FIELDS_PROFILE_TOP.email} />
    </FlexRowsWrapper>
    <FlexRowsWrapper>
      <div className={CLASSNAMES.passwordWrapper}>
        <TextField {...fieldProps} {...FIELDS_PROFILE_TOP.password} />
      </div>
      <div className={CLASSNAMES.buttonWrapper}>
        <Button label='Change' onClick={action('change')} />
      </div>
    </FlexRowsWrapper>
    <Headline type='H6'>{getTextKnob({ defaultText: 'Adress', name: 'address' })}</Headline>
  </ProfileFormPartWrapper>
)

ProfileFormPart.propTypes = {
  fieldProps: PropTypes.object.isRequired,
}

export default ProfileFormPart
