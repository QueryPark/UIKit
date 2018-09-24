// Query Park Inc. 2018

// This component handles searching

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { assign } from 'lodash'

import AsyncSelect from 'react-select/lib/Async'

import {
  SearchOption,
  ChosenWell,
  WellsFound
} from './components/index'

const { fetch, Headers } = window
const QP_URL_ROOT = 'https://api.querypark.com/v1/'

const createNewHeaders = (apiKey) => new Headers({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
})

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.defaultState = {
      well: {},
      showDetails: false
    }

    this.state = assign({}, this.defaultState)
    this.selectRef = null

    this.headers = createNewHeaders(props.API_KEY)
    this.onChange = this.onChange.bind(this)
    this.getWells = this.getWells.bind(this)
    this.reset = this.reset.bind(this)
    this.chosenWellHeader = this.chosenWellHeader.bind(this)
  }

  reset () {
    this.setState(this.defaultState)
    this.props.updateHeader(<h1>Well Search</h1>)
    this.props.updateFooter(<p />)
  }

  chosenWellHeader (chosenWell, showDetails = false) {
    this.props.updateHeader(<ChosenWell.Header well={chosenWell}
      clickDetails={() => {
        const showDetails = !this.state.showDetails
        this.setState({ showDetails })
        this.chosenWellHeader(chosenWell, showDetails)
      }}
      showDetails={showDetails}
    />)
  }

  onChange (chosenWell) {
    this.chosenWellHeader(chosenWell)
    this.props.updateFooter(<ChosenWell.Footer reset={this.reset} />)

    this.setState({
      well: chosenWell,
      previousInput: this.state.inputValue
    })

    if (typeof this.props.onWellSelect === 'function') {
      this.props.onWellSelect(chosenWell)
    }
  }

  async getWells (input) {
    const url = QP_URL_ROOT + 'suggest'
    const data = { query: input, size: 10, standardize: true }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      })

      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.message)
      }

      const wells = json.payload.wells
      this.props.updateFooter(<WellsFound json={json} />)
      return wells
    } catch (err) {
      console.log(err)
      return []
      // handleError(err.message)
    }
  }

  render () {
    const { well, showDetails } = this.state
    // Debouncing the getWells function prevents the api from sending queries
    // every key press. For example, a typical user will type more than 2-3
    // characters before the search is even relevant, so we avoid wasting
    // credits on intermediate searches
    // const loadOptions = debounce(this.getWells, 150)
    if (well.uuid) {
      return (
        <Fragment>
          {
            showDetails
              ? <ChosenWell.Details well={well} />
              : <ChosenWell well={well} />
          }
        </Fragment>
      )
    } else {
      const searchStyle = css`
        margin: 10px;
      `

      return (
        <AsyncSelect
          className={searchStyle}
          components={{
            Option: SearchOption
          }}
          styles={{
            menu: (base, style) => ({
              margin: '5px 0 0'
            })
          }}

          backspaceRemovesValue={false}

          onInputChange={(val, action) => {
            if (action.action === 'input-blur') {
              this.props.updateFooter(<p />)
            }
          }}

          getOptionLabel={(option) => option.primaryHeader.value}
          getOptionValue={(option) => option.uuid}

          cacheOptions
          loadOptions={this.getWells}
          onChange={this.onChange}
          // remove filtering (this is already done by the api)
          filterOption={null}
        />
      )
    }
  }
}

SearchBar.propTypes = {
  API_KEY: PropTypes.string.isRequired,
  onWellSelect: PropTypes.func,

  updateHeader: PropTypes.func.isRequired,
  updateFooter: PropTypes.func.isRequired
}

export default SearchBar
