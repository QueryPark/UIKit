// Query Park Inc. 2018

// This component handles searching

import React, { Component } from 'react'
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
const style = {
  container: (_base, _style) => ({ margin: '0' }),
  menu: (_base, _style) => ({ margin: '4px 0 0' })
}

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
    this.onInputChange = this.onInputChange.bind(this)
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
    const query = `?query=${input.replace(/-|\/|\\|\s/g, '')}`
    const url = QP_URL_ROOT + 'suggest' + query

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
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

  onInputChange (val, action) {
    if (action.action === 'input-blur') {
      this.props.updateFooter(<p />)
    }
  }

  render () {
    const { well, showDetails } = this.state

    if (well.uuid) {
      return showDetails
        ? <ChosenWell.Details well={well} />
        : <ChosenWell well={well} />
    } else {
      const searchStyle = css`margin: 10px;`

      return <AsyncSelect cacheOptions
        className={searchStyle}
        components={{ Option: SearchOption }}
        styles={style}
        filterOption={null}
        getOptionLabel={(option) => option.primaryHeader.value}
        getOptionValue={(option) => option.uuid}
        loadOptions={this.getWells}
        onChange={this.onChange}
        onInputChange={this.onInputChange} />
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
