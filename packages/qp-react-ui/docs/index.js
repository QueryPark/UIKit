import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { Search } from 'qp-react-ui'

const App = () => <Search />

ReactDOM.render(<App />, document.getElementById('root'))
