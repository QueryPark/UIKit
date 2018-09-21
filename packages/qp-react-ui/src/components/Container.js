// Query Park Inc. 2018

// This component wraps the whole QP widget

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import { COLORS } from '../theme'

const style = css`
  position: relative;
  width: 100%;
  max-width: 500px;

  box-shadow: 0 2px 6px 0 ${COLORS.GREY6};
  border-radius: 10px;

  background-color: ${COLORS.WHITE};

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500');
  font-family: 'Roboto', sans-serif;
  & p, h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }  
`

const Container = ({ children }) => (
  <div className={style}>
    { children }
  </div>
)

Container.propTypes = {
  children: PropTypes.array
}

export default Container
