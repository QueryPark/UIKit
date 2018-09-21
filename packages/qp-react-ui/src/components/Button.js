// Query Park Inc. 2018

// This component renders a button

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { merge } from 'lodash'

import { COLORS } from '../theme'

const defaultOptions = {
  color: COLORS.GREY1,
  backgroundColor: COLORS.GREY6,
  hoverColor: COLORS.GREY1,
  hoverBackgroundColor: COLORS.GREY5
}

const Button = ({ onClick, children, options }) => {
  const {
    color,
    backgroundColor,
    hoverColor,
    hoverBackgroundColor
  } = merge({}, defaultOptions, options)

  const style = css`
    height: 30px;

    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase;

    color: ${color};
    background-color: ${backgroundColor};
    
    border: none;
    border-radius: 5px;

    &:hover {
      color: ${hoverColor};
      background-color: ${hoverBackgroundColor};
    }
  `

  return (
    <button className={style} onClick={onClick}>{ children }</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  options: PropTypes.object
}

export default Button
