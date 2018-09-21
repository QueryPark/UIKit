// Query Park Inc. 2018

// This component renders attributes as an array of pills

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import {
  Pill
} from '../../components/index'

const pillbox = css`
  display: flex;
  justify-content: flex-end;
`

const mapAttributes = (attributes) => {
  const pills = []
  const {
    region,
    isLatest
  } = attributes

  if (region) {
    let regionPill
    switch (region) {
      case 'AB':
        regionPill = <Pill key='ab' options={{ backgroundColor: '#00278B' }}>AB</Pill>
        break
      default:
        break
    }
    regionPill && pills.push(regionPill)
  }

  if (isLatest) {
    pills.push(<Pill key='latest' options={{ backgroundColor: '#24C66F' }}>Latest</Pill>)
  } else {
    pills.push(<Pill key='historical' options={{ backgroundColor: '#C62424' }}>Historical</Pill>)
  }

  return pills
}

const Pillbox = ({ attributes }) => {
  const pills = mapAttributes(attributes)

  return (
    <div className={pillbox}>
      { pills }
    </div>
  )
}

Pillbox.propTypes = {
  attributes: PropTypes.object.isRequired
}

export default Pillbox
