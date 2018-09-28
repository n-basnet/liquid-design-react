import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Headline from '~/elements/Headline'
import Accordion from '~/components/Accordion'
import COLORS from '~/utils/consts/colors'
import attachClassName from '~/components/aux/hoc/attachClassName'

export class Faq extends PureComponent {
  static propTypes = {
    faqContent: PropTypes.array.isRequired,
    headlinesTexts: PropTypes.object.isRequired,
  }

  accordionsContent = this.props.faqContent.map((accordionContent, index) => (
    <Accordion key={`${index}-${accordionContent.title}`} title={accordionContent.title}>
      {accordionContent.content}
    </Accordion>
  ))

  render() {
    const { headlinesTexts, faqContent, ...props } = this.props
    const richBlackLightest = COLORS.RICH_BLACK_LIGHTEST

    return (
      <section {...props}>
        <Headline type='H1' style={{ paddingBottom: '20px', textAlign: 'center' }}>
          {headlinesTexts.primary}
        </Headline>
        <Headline
          type='H3'
          style={{
            maxWidth: '75%',
            minWidth: '240px',
            margin: 'auto',
            paddingBottom: '50px',
            textAlign: 'center',
            fontWeight: 400,
            lineHeight: 1.75,
            color: richBlackLightest,
          }}
        >
          {headlinesTexts.secondary}
        </Headline>
        {this.accordionsContent}
      </section>
    )
  }
}

const { Component } = attachClassName(Faq)

export default Component
