import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  find,
  innerJoin,
  symmetricDifferenceWith,
  prop,
  eqBy,
  isEmpty,
  without,
} from 'ramda'
import enhanceWithClickOutside from 'react-click-outside'
import cx from 'classnames'

import { getClassName } from '../../../components/misc/hoc/attachClassName'
import { getItemsWithIds } from '../../../utils/misc'
import Ellipsis from '../../../components/misc/Ellipsis'
import SelectedOptionsLabel from '../../../elements/misc/SelectedOptionsLabel'
import { Glyph, ICON_CLASSNAME } from '../../../elements/Icon'
import OptionsGroup from '../../../elements/misc/OptionsGroup'
import ActiveOption from '../../../elements/misc/ActiveOption'

export const DROPDOWN_ICON_CLASSNAME = `${ICON_CLASSNAME}DropdownIcon`
export const DROPDOWN_TRIGGER_CLASSNAME = getClassName({
  name: 'DropdownTrigger',
})
export class DropdownProvider extends PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    }),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    /** If false, will render Dropdown component. Set to true for Filter component */
    isFilter: PropTypes.bool,
    multiselect: PropTypes.bool,
    /** For controlling the state of multiselect version. */
    selectedOptionsIds: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      }),
    ),
    onOptionDeselect: PropTypes.func,
    onOptionSelect: PropTypes.func,
    onSubmit: PropTypes.func,
    nameForClassName: PropTypes.string,
    /** Id of selected option - for controlling the state externally. */
    value: PropTypes.string,
  }

  static defaultProps = {
    label: null,
    className: '',
    defaultValue: null,
    disabled: false,
    inline: false,
    isFilter: false,
    multiselect: false,
    selectedOptionsIds: [],
    options: [],
    onOptionDeselect: () => {},
    onOptionSelect: () => {},
    onSubmit: () => {},
    nameForClassName: null,
    value: null,
  }

  state = {
    isExpanded: false,
    submittedOption: null,
    wasSubmitted: false,
  }

  toggle = () =>
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))

  getKeyDownHandler = handler => e => e.key === 'Enter' && handler()
  handleClickOutside = () => this.setState({ isExpanded: false })
  handleSubmit = option => {
    if (this.props.multiselect) {
      const { selectedOptionsIds, options } = this.props
      const previouslyActiveOptions = innerJoin(
        (o, id) => o.id === id,
        options,
        selectedOptionsIds,
      )
      const currentActiveOptions = symmetricDifferenceWith(
        eqBy(prop('id')),
        previouslyActiveOptions,
        [option],
      )
      this.props.onSubmit && this.props.onSubmit(currentActiveOptions)
      if (currentActiveOptions.length > previouslyActiveOptions.length) {
        this.props.onOptionSelect && this.props.onOptionSelect(option)
      } else {
        this.props.onOptionDeselect && this.props.onOptionDeselect(option)
      }
      return
    }

    const activeOption = this.getActiveOption()
    const hasReselectedSameOption =
      activeOption && option.id === activeOption.id
    // if the state is internal, reselecting is resetting
    const submittedOption =
      !this.props.value && hasReselectedSameOption ? null : option
    this.setState({
      submittedOption,
      isExpanded: false,
      wasSubmitted: true,
    })
    this.props.onSubmit && this.props.onSubmit(submittedOption)
    if (submittedOption) {
      this.props.onOptionSelect && this.props.onOptionSelect(submittedOption)
    } else {
      this.props.onOptionDeselect && this.props.onOptionDeselect(activeOption)
    }
  }

  getActiveOption = () => {
    const { submittedOption, wasSubmitted } = this.state
    const { defaultValue, value, options } = this.props
    // handling external control
    const activeOptionFromValue =
      value && find(({ id }) => id === value, options)
    if (activeOptionFromValue) {
      return activeOptionFromValue
    }
    return submittedOption || (!wasSubmitted && defaultValue) || null
  }

  /*
    If in Filter component - render ActiveOption component with close icon,
    otherwise (Dropdown) - render just text string with option name
  */
  renderActiveOption = activeOption =>
    this.props.isFilter ? (
      <ActiveOption
        activeOption={activeOption}
        onIconClick={this.handleSubmit}
      />
    ) : (
      activeOption.name
    )

  render() {
    const {
      disabled,
      multiselect,
      selectedOptionsIds,
      className,
      nameForClassName,
      render,
      options,
      onSubmit,
      onOptionDeselect,
      onOptionSelect,
      label,
      isFilter,
      ...props
    } = this.props

    const { isExpanded } = this.state
    const triggerToggle = disabled ? undefined : this.toggle
    const hasSelectedOptions = multiselect && !isEmpty(selectedOptionsIds)
    const activeOption = this.getActiveOption()

    const optionsGroupProps = {
      submitHandler: this.handleSubmit,
      selectedOption: activeOption,
      multiselect: multiselect,
      selectedOptionsIds: selectedOptionsIds,
      options: options,
    }

    return render({
      isExpanded,
      wrapperProps: {
        disabled,
        isExpanded,
        className: cx(
          className,
          nameForClassName && getClassName({ name: nameForClassName }),
        ),
        ...props,
      },
      triggerWrapperProps: {
        className: DROPDOWN_TRIGGER_CLASSNAME,
        hasValue: activeOption,
        onClick: triggerToggle,
        onKeyDown: this.getKeyDownHandler(triggerToggle),
        isExpanded: isExpanded,
        multiselect: multiselect,
        tabIndex: '0',
        role: 'button',
        isFilter: isFilter,
        ...props,
      },
      renderLabelContent: () =>
        hasSelectedOptions ? (
          <SelectedOptionsLabel
            handleRemove={option => {
              onSubmit(
                getItemsWithIds(
                  options,
                  without(option.id, selectedOptionsIds),
                ),
              )
              onOptionDeselect(option)
            }}
            items={getItemsWithIds(options, selectedOptionsIds)}
          />
        ) : (
          <Ellipsis
            style={{ minHeight: '28px', maxWidth: 'calc(100% - 25px)' }}
          >
            {activeOption ? this.renderActiveOption(activeOption) : label}
          </Ellipsis>
        ),
      renderGlyph: ({ name, size } = {}) => (
        <Glyph
          name={name || 'arrowTop'}
          className={DROPDOWN_ICON_CLASSNAME}
          size={size || 20}
          color={disabled ? 'black.base' : undefined}
          style={disabled ? { opacity: 0.05 } : {}}
        />
      ),
      renderOptionsGroup: props =>
        isExpanded && <OptionsGroup {...optionsGroupProps} {...props} />,
    })
  }
}

export default enhanceWithClickOutside(DropdownProvider)
