// Query Park Inc. 2018

// This component adds the footer, including a powered by qp message

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import { COLORS } from '../theme'

const style = css`
  height: 30px;

  padding: 10px;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${COLORS.GREY7};

  color: ${COLORS.GREY3};
  font-size: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & h6 {
    align-self: flex-end;
    font-size: 8px;
    color: ${COLORS.GREY4};
  }

  & a {
    color: ${COLORS.LINK};
  }
`

const Footer = ({ children }) => (
  <div className={style}>
    <div>
      { children }
    </div>
    <h6>
      POWERED BY <a
        href='https://www.querypark.com'
        rel='noopener noreferrer'
        target='_blank'
      >
          QUERY PARK INC.
      </a>
    </h6>
  </div>
)

Footer.propTypes = {
  children: PropTypes.object
}

export default Footer
