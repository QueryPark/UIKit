// Query Park Inc. 2018

// This component renders the chosen well

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { merge, startCase } from 'lodash'

import {
  flow,
  keys,
  chunk,
  map,
  sortBy,
  filter,
  reduce,
  each
} from 'lodash/fp'

import {
  Field,
  Button
} from '../../components/index'

import Pillbox from './Pillbox'

import { COLORS } from '../../theme'
import expandObject from '../../util/expandObject'

const style = css`
  display: flex;
  flex-direction: column;
  
  padding: 10px;
  margin-bottom: 12px;

  & > div {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;

    margin: 0 0 8px;
  }

  & > div:last-child {
    margin: 0;
  }
`

const ChosenWell = ({ well }) => {
  const {
    subheader,
    govId,
    surfaceLocation,
    owner
  } = well

  const fieldOptions = {
    oLabel: { size: '12px' },
    oValue: { size: '20px' }
  }
  const rightFieldOptions = merge({}, fieldOptions, { textAlign: 'right' })

  return (
    <div className={style}>
      <div>
        <Field label={subheader.label} value={subheader.value}
          options={fieldOptions} />
        <Field label={govId.label} value={govId.value}
          options={rightFieldOptions}
        />
      </div>
      <div>
        <Field label={surfaceLocation.label} value={surfaceLocation.value}
          options={fieldOptions}
        />
        <Field label={owner.label} value={owner.value}
          options={rightFieldOptions}
        />
      </div>
      <div>
        <div /> { /* align pillbox rtl */ }
        <Pillbox attributes={well.attributes} />
      </div>
    </div>
  )
}

ChosenWell.propTypes = {
  well: PropTypes.object.isRequired
}

const ChosenWellHeader = ({ well, clickDetails, showDetails }) => {
  const {
    primaryHeader
  } = well

  return (
    <Fragment>
      <Field
        label={primaryHeader.label}
        value={primaryHeader.value}
        options={{
          oLabel: {
            color: COLORS.GREY2
          },
          oValue: {
            size: '20px',
            color: COLORS.GREY1,
            weight: 500
          }
        }}
      />
      <Button onClick={clickDetails} options={{
        backgroundColor: COLORS.WHITE,
        hoverBackgroundColor: COLORS.SECONDARY
      }}>
        {showDetails ? 'Overview' : 'Details'}
      </Button>
    </Fragment>
  )
}

ChosenWellHeader.propTypes = {
  well: PropTypes.object.isRequired,
  clickDetails: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired
}

ChosenWell.Header = ChosenWellHeader

const ChosenWellFooter = ({ reset }) => (
  <Button onClick={() => reset()}>
      Reset Search
  </Button>
)

ChosenWellFooter.propTypes = {
  reset: PropTypes.func.isRequired
}

ChosenWell.Footer = ChosenWellFooter

const ChosenWellDetails = ({ well: { wellData } }) => {
  // https://github.com/lodash/lodash/wiki/FP-Guide#convert
  const mapWithKeys = map.convert({ cap: false })

  const setOptions = (index) => index % 2 === 0
    ? {}
    : { textAlign: 'right' }

  const skipLabels = /^next|prev|createddate$/i
  const isDate = /date/i

  const renderValue = (label, value) => isDate.test(label)
    ? new Date(value).toUTCString()
    : value.toString()

  const fields = flow(
    keys,
    filter(label => !skipLabels.test(label)),
    sortBy(label => label),
    reduce((acc, label) => {
      if (typeof wellData[label] === 'object') {
        const props = expandObject(wellData[label], label)
        const res = [...acc]
        // add new prop to well data object &
        // add new label to result
        each(({ label, value }) => {
          wellData[label] = value
          res.push(label)
        }, props)

        // delete old label
        delete wellData[label]

        return res
      } else {
        return [...acc, label]
      }
    }, []),
    mapWithKeys((label, key) => (<Field
      key={key}
      label={startCase(label)}
      value={renderValue(label, wellData[label])}
      options={setOptions(key)}
    />)),
    chunk(2),
    mapWithKeys((chunk, key) => (
      <div key={`chunk-${key}`}>
        { chunk }
      </div>
    ))
  )

  return (
    <div className={style}>
      { fields(wellData) }
    </div>
  )
}

ChosenWellDetails.propTypes = {
  well: PropTypes.object.isRequired
}

ChosenWell.Details = ChosenWellDetails

export default ChosenWell
