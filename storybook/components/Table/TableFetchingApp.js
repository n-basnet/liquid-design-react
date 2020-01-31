/* eslint-disable camelcase */

import React, { PureComponent } from 'react'
import { prop } from 'ramda'
import { fetch } from 'whatwg-fetch'
import { format } from 'date-fns'

import { Fragment } from '../../helpers'
import Table, { TABLE_CLASSNAME } from '../../../src/components/Table'

const GH_REPOS_URL = 'https://api.github.com/users/github/repos'
const getUrl = ({ page, perPage, sort, direction }) =>
  `${GH_REPOS_URL}?per_page=${perPage || 5}&page=${page || 0}${
    sort ? `&sort=${sort}` : ''
  }${direction ? `&direction=${direction}` : ''}`
const getRepos = config => fetch(getUrl(config)).then(res => res.json())

const getSortHandler = (sort, instance) => ({ sortColumn, sortMode }) => {
  instance.fetchData(
    sortMode === 'UNSORTED'
      ? {}
      : {
          sort,
          direction: sortMode === 'ASCENDING' ? 'asc' : 'desc',
        },
  )
}

export default class extends PureComponent {
  state = {
    isFetching: false,
    rows: [],
    columns: [
      {
        header: 'id',
        accessor: prop('id'),
      },
      {
        header: 'Full Name',
        accessor: prop('full_name'),
        cellRenderer: (name, { html_url }) => (
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        ),
        onSort: getSortHandler('full_name', this),
      },
      {
        header: 'Created',
        accessor: row => format(row.created_at, 'DD/MM/YYYY'),
        onSort: getSortHandler('created', this),
      },
    ],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = (config = {}) => {
    this.setState({ isFetching: true })
    getRepos(config).then(rows =>
      this.setState({ rows }, () => this.setState({ isFetching: false })),
    )
  }

  render() {
    const { ...props } = this.props
    const { isFetching, rows, columns } = this.state
    return (
      <Fragment>
        <style>
          {`
          .${TABLE_CLASSNAME} {
            width: 100%;
          }
          .${TABLE_CLASSNAME} table {
            width: 100%;
          }
        `}
        </style>
        <Table
          {...props}
          rows={rows}
          columns={columns}
          style={{ opacity: isFetching ? 0.5 : 1 }}
        />
      </Fragment>
    )
  }
}
