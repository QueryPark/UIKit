import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'

import App from './App'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bitter', serif;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
