import { find } from 'ramda'
import dateFns from 'date-fns'

import DATEPICKER_CONSTS from './consts'

export const toCommonFormat = (dateString, format, separator) => {
  const splittedFormat = format.toLowerCase().split(separator)
  const splittedDateString = dateString.split(separator)
  const dateObj = {
    dd: splittedDateString[splittedFormat.indexOf('dd')],
    mm: splittedDateString[splittedFormat.indexOf('mm')],
    yyyy: splittedDateString[splittedFormat.indexOf('yyyy')],
  }
  return `${dateObj.yyyy}-${dateObj.mm}-${dateObj.dd}`
}

export const getSeparator = format => {
  const possibleSeparators = DATEPICKER_CONSTS.POSSIBLE_SEPARATORS

  return find(item => format.indexOf(item) > 0)(possibleSeparators)
}

export const getFormatRegexp = format => {
  const dayPart = '(0[1-9]|[12]\\d|3[01])'
  const monthPart = '(0[1-9]|1[0-2])'
  const yearPart = '[12]\\d{3}'

  const regExpString = format
    .toLowerCase()
    .replace('dd', dayPart)
    .replace('mm', monthPart)
    .replace('yyyy', yearPart)
    .replace(/[/.]/g, '\\$&')
    .replace(/\s/g, '\\s')

  return new RegExp(`^${regExpString}$`)
}

export const checkEndDateWithStartDate = (
  formattedEndDate,
  startDate,
  startDateInputValue,
  format,
  errorMessage
) => {
  if (startDate && dateFns.format(startDate, format) === startDateInputValue) {
    return dateFns.isAfter(formattedEndDate, startDate) ||
      dateFns.isEqual(formattedEndDate, startDate)
      ? true
      : errorMessage
  } else {
    return true
  }
}
