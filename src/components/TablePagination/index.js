import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { getClassName } from '../../components/misc/hoc/attachClassName'
import { Glyph } from '../../elements/Icon'
import { TEXT } from '../../components/TablePagination/consts'
import {
  ClickableSection,
  Section,
  TablePaginationWrapper,
  PerPageSection,
  ItemsSection,
  Separator,
} from '../../components/TablePagination/styled'
import DropdownSection from '../../components/TablePagination/DropdownSection'
import { times } from '../../utils/misc'

const getNumberOption = num => ({
  name: num.toString(),
  id: num.toString(),
})

export const TABLE_PAGINATION_CLASSNAME = getClassName({
  name: 'TablePagination',
})

export default class TablePagination extends PureComponent {
  static propTypes = {
    itemsCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    /** Handle current page change */
    onChange: PropTypes.func.isRequired,
    onItemsPerPageAmountChange: PropTypes.func,
    itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    itemsPerPageAmount: PropTypes.number,
    /** Function returning the left-most string ("Items per page" by default) */
    perPageText: PropTypes.func,
    /** Function returning the amount of items string ("X of Y items" by default). It will receive `{amount, total}` object as argument */
    ofItemsText: PropTypes.func,
    /** Function returning the amount of pages string ("X of Y pages" by default). It will receive `{amount, total}` object as argument */
    ofPagesText: PropTypes.func,
    /** Applies different styling and opens Dropdowns above the component. */
    isDisplayedBelowTable: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    itemsPerPageOptions: [10, 20, 40, 80],
    itemsPerPageAmount: 10,
    onItemsPerPageAmountChange: null,
    perPageText: TEXT.PER_PAGE,
    ofItemsText: TEXT.OF_ITEMS,
    ofPagesText: TEXT.OF_PAGES,
    isDisplayedBelowTable: false,
    className: null,
  }

  componentDidUpdate() {
    // go to last possible page if exceeded page count (e.g. by updating the itemsPerPageAmount)
    const { onChange, currentPage } = this.props
    const pagesSum = this.getPagesSum()
    if (pagesSum > 0 && currentPage > pagesSum) {
      onChange(pagesSum)
    }
  }

  getPagesSum = () =>
    Math.ceil(this.props.itemsCount / this.props.itemsPerPageAmount)

  getLastItemIndex = () =>
    Math.min(
      this.props.itemsCount,
      this.props.itemsPerPageAmount * this.props.currentPage,
    )

  getAmountOfItemsString = () =>
    `${this.props.itemsPerPageAmount * (this.props.currentPage - 1) +
      1}-${this.getLastItemIndex()}`

  getPagesOptions = () =>
    times(this.getPagesSum()).map(index => getNumberOption(index + 1))

  getPerPageOptions = () => this.props.itemsPerPageOptions.map(getNumberOption)
  getPageInBounds = pageNum =>
    Math.min(Math.max(1, pageNum), this.getPagesSum())

  render() {
    const {
      currentPage,
      onChange,
      itemsCount,
      itemsPerPageAmount,
      itemsPerPageOptions,
      onItemsPerPageAmountChange,
      perPageText,
      ofItemsText,
      ofPagesText,
      isDisplayedBelowTable,
      className,
      ...props
    } = this.props

    const isPrevPageDisabled = currentPage === 1
    const isNextPageDisabled = currentPage === this.getPagesSum()

    return (
      <TablePaginationWrapper
        className={cx(className, TABLE_PAGINATION_CLASSNAME)}
        {...props}
        isDisplayedBelowTable={isDisplayedBelowTable}
      >
        <PerPageSection>
          <span>{perPageText()}</span>
          <DropdownSection
            value={itemsPerPageAmount.toString()}
            options={this.getPerPageOptions()}
            onSubmit={({ id }) => onItemsPerPageAmountChange(parseInt(id))}
            shouldOpenToTop={isDisplayedBelowTable}
            isItemsPerPageDropdown
          />
          <Separator>|</Separator>
          <span>
            {ofItemsText({
              amount: this.getAmountOfItemsString(),
              total: itemsCount,
            })}
          </span>
        </PerPageSection>
        <Section>
          <ItemsSection>
            <span>
              {ofPagesText({ amount: currentPage, total: this.getPagesSum() })}
            </span>
          </ItemsSection>

          <ClickableSection
            disabled={isPrevPageDisabled}
            onClick={() => onChange(this.getPageInBounds(currentPage - 1))}
          >
            <Glyph
              name="arrowLeft"
              color={isPrevPageDisabled ? 'sensitiveGrey.darker' : undefined}
            />
          </ClickableSection>
          <DropdownSection
            value={currentPage.toString()}
            options={this.getPagesOptions()}
            onSubmit={({ id }) => onChange(parseInt(id))}
            shouldOpenToTop={isDisplayedBelowTable}
          />
          <ClickableSection
            disabled={isNextPageDisabled}
            onClick={() => onChange(this.getPageInBounds(currentPage + 1))}
            isDisplayedBelowTable={isDisplayedBelowTable}
            data-test="increaseCurrentPage"
          >
            <Glyph
              name="arrowRight"
              color={isNextPageDisabled ? 'sensitiveGrey.darker' : undefined}
            />
          </ClickableSection>
        </Section>
      </TablePaginationWrapper>
    )
  }
}
