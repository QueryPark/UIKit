import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify-es'
import pkg from './package.json'

const name = 'UIKit'
const path = 'dist/qp-react-ui'
const globals = {
  classnames: 'classNames',
  emotion: 'emotion',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  react: 'React',
  'react-select/lib/Async': 'AsyncSelect',
  '@babel/runtime/regenerator': '_regeneratorRuntime'
}

const external = id => {
  if (globals.hasOwnProperty(id)) {
    return true
  }

  if (/lodash/.test(id)) {
    globals[id] = '_' + id.split('/').slice(-1)
    console.log(`${id} -> ${globals[id]}`)
    return true
  }
}

const babelOptions = () => {
  let result = {
    babelrc: false,
    externalHelpers: false,
    runtimeHelpers: true,
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [
      'lodash',
      'emotion',
      '@babel/plugin-proposal-object-rest-spread',
      ['@babel/plugin-transform-runtime', { // for async await syntax
        'helpers': false
      }]
    ]
  }
  return result
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es'
    },
    external,
    plugins: [babel(babelOptions())]
  },

  {
    input: 'src/index.js',
    output: {
      name,
      file: path + '.js',
      format: 'umd',
      globals
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs()]
  },

  {
    input: 'src/index.js',
    output: {
      name,
      file: path + '.min.js',
      format: 'umd',
      globals
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs(), uglify()]
  }
]
