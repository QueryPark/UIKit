// Query Park Inc. 2018

// This component provides well search interactions

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Header,
  Content,
  Footer
} from './components/index'

import SearchBar from './SearchBar/index'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      header: <h1>Well Search</h1>,
      footer: <p />
    }

    this.updateState = this.updateState.bind(this)
  }

  updateState (key) {
    return (value) => this.setState({ [key]: value })
  }

  render () {
    const {
      API_KEY
    } = this.props

    const {
      header,
      footer
    } = this.state

    return (
      <Container>
        <Header>
          { header }
        </Header>
        <Content>
          <SearchBar
            API_KEY={API_KEY}
            updateHeader={this.updateState('header')}
            updateFooter={this.updateState('footer')}
          />
        </Content>
        <Footer>
          { footer }
        </Footer>
      </Container>
    )
  }
}

Search.propTypes = {
  API_KEY: PropTypes.string.isRequired
}

export default Search
