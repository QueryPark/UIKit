// Query Park Inc. 2018

// This component adds the header

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import { COLORS } from '../theme'

const style = css`
  height: 30px;
  padding: 10px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.GREY1};

  display: flex;
  align-items: center;
  justify-content: space-between;

  & h1 {
    font-size: 20px;
    line-height: 20px;
  }
`

const Header = ({ children }) => (
  <div className={style}>
    { children }
  </div>
)

Header.propTypes = {
  children: PropTypes.object
}

export default Header
