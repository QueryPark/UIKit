// Query Park Inc. 2018

// This component renders attributes as an array of pills

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import {
  Pill
} from '../../components/index'

import {
  COLORS
} from '../../theme'

const { GOOG } = COLORS

const getOpts = (level = 'L300') => (color = 'RED') => ({
  backgroundColor: GOOG[level][color].HEX,
  color: GOOG[level][color].TEXT
})

const L500Opts = getOpts('L500')
const L300Opts = getOpts('L300')

const PILL_OPTS = {
  // Canadian Provinces, LTR, loosely by football team colors
  BC: L300Opts('ORANGE'),
  AB: L300Opts('RED'),
  SK: L300Opts('GREEN'),
  MB: L300Opts('INDIGO'),

  REG_DEF: L300Opts('BROWN'),

  // Well Direction
  HZ: L500Opts('LIGHT_BLUE'),
  VT: L500Opts('CYAN'),
  DIR: L500Opts('YELLOW'),
  SLT: L500Opts('AMBER'),

  // Latest well?
  LATEST: L500Opts('LIGHT_GREEN'),
  HIST: L500Opts('DEEP_ORANGE')
}

const pillbox = css`
  display: flex;
  justify-content: flex-end;
`

const drillDirParse = (drillDir) => {
  let drillDirCode
  switch (drillDir.toLowerCase()) {
    case 'hz':
    case 'horz':
    case 'horizontal':
      drillDirCode = 'HZ'
      break
    case 'vt':
    case 'vert':
    case 'vertical':
      drillDirCode = 'VT'
      break
    case 'dir':
    case 'directional':
      drillDirCode = 'DIR'
      break
    case 'slt':
    case 'slant':
      drillDirCode = 'SLT'
      break
    default:
      drillDirCode = false
      break
  }

  return drillDirCode
}

const mapAttributes = (attributes) => {
  const pills = []
  const {
    region,
    drillDirection,
    isLatest
  } = attributes

  if (region) {
    let regionPill
    switch (region) {
      case 'AB':
        regionPill = <Pill key='ab' options={PILL_OPTS[region]}>AB</Pill>
        break
      default:
        regionPill = <Pill key={region} options={PILL_OPTS.REG_DEF}>{region}</Pill>
        break
    }
    pills.push(regionPill)
  }

  const drillDirCode = drillDirParse(drillDirection)
  if (drillDirCode) {
    pills.push(<Pill key={drillDirCode} options={PILL_OPTS[drillDirCode]}>{drillDirCode}</Pill>)
  }

  if (isLatest) {
    pills.push(<Pill key='latest' options={PILL_OPTS.LATEST}>Latest</Pill>)
  } else {
    pills.push(<Pill key='historical' options={PILL_OPTS.HIST}>Hist</Pill>)
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
