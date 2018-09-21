// Query Park Inc. 2018

// This component renders a pill

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { merge } from 'lodash'

import { COLORS } from '../theme'

const defaultOptions = {
  color: COLORS.WHITE,
  backgroundColor: COLORS.GREY2
}

const Pill = ({
  children,
  options
}) => {
  options = merge({}, defaultOptions, options)

  const style = css`
    background-color: ${options.backgroundColor};

    color: ${options.color};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 500;

    border-radius: 10px;
    height: 15px;
    padding: 0 5px;
    margin-right: 5px;

    display: flex;
    align-items: center;
    
    &:last-child {
      margin-right: 0;
    }
  `

  return (
    <div className={style}>{ children }</div>
  )
}

Pill.propTypes = {
  children: PropTypes.string,
  options: PropTypes.object
}

export default Pill
