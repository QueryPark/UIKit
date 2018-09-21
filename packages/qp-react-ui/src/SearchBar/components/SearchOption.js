// Query Park Inc. 2018

// This component renders the well options in a nice way

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import {
  Field
} from '../../components/index'

import Pillbox from './Pillbox'

import { COLORS } from '../../theme'

const style = css`
  display: flex;
  flex-direction: column;
  
  box-sizing: border-box;
  border-left: 5px solid transparent;
  padding: 10px;
  margin-bottom: 12px;

  &:hover {
  border-left: 5px solid ${COLORS.PRIMARY};
  background-color: ${COLORS.GREY7};
  }

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

const SearchOption = ({
  innerRef, innerProps,

  data,
  selectProps,
  selectOption
}) => {
  // const searchInput = selectProps.inputValue

  const {
    primaryHeader,
    subheader,
    govId,
    surfaceLocation
  } = data

  const primaryHeaderOptions = { oValue: { weight: 500 } }
  const govIdOptions = { textAlign: 'right' }

  return (
    <div ref={innerRef} {...innerProps} className={style}
      onClick={() => selectOption(data)}
    >
      <div>
        <Field label={primaryHeader.label} value={primaryHeader.value}
          options={primaryHeaderOptions}
        />
        <Field label={govId.label} value={govId.value}
          options={govIdOptions}
        />
      </div>
      <div>
        <Field label={subheader.label} value={subheader.value} />
        <Field label={surfaceLocation.label} value={surfaceLocation.value} />
        <Pillbox attributes={data.attributes} />
      </div>
    </div>
  )
}

SearchOption.propTypes = {
  innerRef: PropTypes.func,
  innerProps: PropTypes.object.isRequired,

  data: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
  selectOption: PropTypes.func.isRequired
}

export default SearchOption
