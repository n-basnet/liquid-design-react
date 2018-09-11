import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FooterWrapper from '~/modules/Footer/FooterWrapper'
import HorizontalLine from '~/modules/Footer/HorizontalLine'
import IconsWrapper from '~/modules/Footer/IconsWrapper'
import LabelsWrapper from '~/modules/Footer/LabelsWrapper'
import FooterBar from '~/modules/Footer/FooterBar'
import Headline from '~/elements/Headline'
import Icon from '~/elements/Icon'
import Label from '~/elements/Label'

class Footer extends Component {
  static propTypes = {
    headlineText: PropTypes.string,
    iconsNamesAndActions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        onClick: PropTypes.func,
      })
    ),
    labelsTexts: PropTypes.arrayOf(PropTypes.string),
    mainIconName: PropTypes.string,
  }

  static defaultProps = {
    headlineText: 'Text',
    iconsNamesAndActions: null,
    labelsTexts: null,
    mainIconName: null,
  }

  labels = this.props.labelsTexts.map((labelText, index) => (
    <Label
      key={`${index}-${labelText}`}
      style={{
        paddingTop: '10px',
        paddingRight: '60px',
        paddingBottom: '10px',
      }}
    >
      {labelText}
    </Label>
  ))

  icons = this.props.iconsNamesAndActions.map((iconNameAndAction, index) => (
    <Icon
      color='black.base'
      key={`${index}-${iconNameAndAction.name}`}
      name={iconNameAndAction.name}
      size={40}
      onClick={iconNameAndAction.onClick}
    />
  ))

  render() {
    const { headlineText, mainIconName } = this.props

    return (
      <FooterWrapper>
        <Headline size='H1'>{headlineText}</Headline>
        <HorizontalLine />
        <FooterBar>
          <Icon
            name={mainIconName}
            color='black.base'
            size={80}
            style={{ marginRight: '140px' }}
          />
          <LabelsWrapper>{this.labels}</LabelsWrapper>
          <IconsWrapper>{this.icons}</IconsWrapper>
        </FooterBar>
      </FooterWrapper>
    )
  }
}

export default Footer
