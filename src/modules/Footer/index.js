import cx from 'classnames'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import FooterWrapper from '../../modules/Footer/FooterWrapper'
import HorizontalLine from '../../modules/Footer/HorizontalLine'
import IconsWrapper from '../../modules/Footer/IconsWrapper'
import LabelsWrapper from '../../modules/Footer/LabelsWrapper'
import FooterBar from '../../modules/Footer/FooterBar'
import Headline from '../../elements/Headline'
import { Glyph } from '../../elements/Icon'
import Label from '../../elements/Label'
import { getClassName } from '../../components/misc/hoc/attachClassName'

const FOOTER_CLASSNAMES = {
  BASE: getClassName({ name: 'Footer' }),
  FOOTER_BAR: getClassName({ name: 'Footer__FooterBar' }),
  LABELS_WRAPPER: getClassName({ name: 'Footer__LabelsWrapper' }),
  HORIZONTAL_LINE: getClassName({ name: 'Footer__HorizontalLine' }),
}

export class Footer extends PureComponent {
  static propTypes = {
    headlineContent: PropTypes.node,
    iconsNamesAndActions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        onClick: PropTypes.func,
      }),
    ),
    labelsTexts: PropTypes.arrayOf(PropTypes.string),
    mainIconName: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    headlineContent: null,
    iconsNamesAndActions: null,
    labelsTexts: null,
    mainIconName: null,
    className: null,
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
    <Glyph
      color="black.base"
      key={`${index}-${iconNameAndAction.name}`}
      name={iconNameAndAction.name}
      size={40}
      onClick={iconNameAndAction.onClick}
    />
  ))

  render() {
    const { headlineContent, mainIconName, className, ...props } = this.props

    return (
      <FooterWrapper
        {...props}
        className={cx(className, FOOTER_CLASSNAMES.BASE)}
      >
        <Headline size="H1">{headlineContent}</Headline>
        <HorizontalLine className={FOOTER_CLASSNAMES.HORIZONTAL_LINE} />
        <FooterBar className={FOOTER_CLASSNAMES.FOOTER_BAR}>
          <Glyph
            name={mainIconName}
            color="black.base"
            size={80}
            style={{ marginRight: '140px' }}
          />
          <LabelsWrapper className={FOOTER_CLASSNAMES.LABELS_WRAPPER}>
            {this.labels}
          </LabelsWrapper>
          <IconsWrapper>{this.icons}</IconsWrapper>
        </FooterBar>
      </FooterWrapper>
    )
  }
}

export default Footer
