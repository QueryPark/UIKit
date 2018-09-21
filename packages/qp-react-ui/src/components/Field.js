// Query Park Inc. 2018

// This component renders a field with a stylized label

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { merge } from 'lodash'

import { COLORS } from '../theme'

const defaultOptions = {
  textAlign: 'left',
  oLabel: {
    color: COLORS.GREY3,
    size: '10px',
    weight: 500,
    level: '2'
  },
  oValue: {
    color: COLORS.GREY1,
    size: '14px',
    weight: 400
  }
}

const Field = ({ label, value, options = {} }) => {
  options = merge({}, defaultOptions, options)
  const {
    textAlign,
    oLabel,
    oValue
  } = options

  const style = css`
    text-align: ${textAlign};

    & h1, h2, h3, h4, h5, h6 {
      margin: 0 0 5px;
      padding: 0;

      text-transform: uppercase;
      
      font-weight: ${oLabel.weight};
      font-size: ${oLabel.size};
      line-height: ${oLabel.size};
      
      color: ${oLabel.color};
    }

    & p {
      margin: 0;
      padding: 0;

      text-transform: uppercase;

      font-weight: ${oValue.weight};
      font-size: ${oValue.size};
      line-height: ${oValue.size};
      
      color: ${oValue.color};
    }
  `

  let Label
  switch (oLabel.level) {
    case '6':
      Label = <h6>{ label }</h6>
      break
    case '5':
      Label = <h5>{ label }</h5>
      break
    case '4':
      Label = <h4>{ label }</h4>
      break
    case '3':
      Label = <h3>{ label }</h3>
      break
    case '1':
      Label = <h1>{ label }</h1>
      break
    default:
      Label = <h2>{ label }</h2>
      break
  }

  return (
    <div className={style}>
      { Label }
      <p>{ value }</p>
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

  options: PropTypes.object
}

export default Field
