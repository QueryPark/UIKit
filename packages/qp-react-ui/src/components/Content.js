// Query Park Inc. 2018

// This component wraps the search interaction

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

const style = css`
  display: relative;
`

const Content = ({ children }) => (
  <div className={style}>
    { children }
  </div>
)

Content.propTypes = {
  children: PropTypes.object
}

export default Content
