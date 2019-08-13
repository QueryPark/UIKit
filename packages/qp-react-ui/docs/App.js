import React, { Component } from 'react'
import { css } from 'emotion'

import { Search } from 'qp-react-ui'

import Logo from './assets/Logo.png'

const style = css`
  & > header {
    width: 100%;
    background-color: #091d28;
    padding: 16px 0;
    margin-bottom: 32px;
    color: white;
    display: flex;
    justify-content: center;

    & > div {
      width: 100%;
      max-width: 500px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & > div > h1 {
      font-size: 1.2rem;
    }
  }

  & > main {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;

    & > section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      margin-bottom: 25px;

      & > input {
        font-size: 0.8em;
        text-align: center;
        width: 300px;
      }

      & > p {
        margin-right: 25px;
      }
    }
  }
`

class App extends Component {
  render () {
    return (
      <div className={style}>
        <header>
          <div>
            <img src={Logo} alt='Query Park' />
            <h1>Demo</h1>
          </div>
        </header>
        <main>
          <section>
            <Search API_KEY='None' />
          </section>
        </main>
      </div>
    )
  }
}

export default App
