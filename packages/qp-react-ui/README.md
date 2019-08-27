# QP React UI Kit

## Installation

Peer dependencies and component library:

```bash
npm i react react-dom qp-react-ui
```

or

```bash
yarn add react react-dom qp-react-ui
```

## Components

### Search

#### Usage

Use in jsx:

```jsx
import React from 'react'
import { Search } from 'qp-react-ui'

const handleWellSelect = (chosenWell) => console.log(chosenWell)

const App = () => (
  <Search API_KEY=''
    onWellSelect={handleWellSelect} />
)
```

Use in html:

```html
<html>
<head>
  ...
  <!-- react CDN -->
  <!-- react-dom CDN -->

  <!-- qp-react-ui taken from node_modules/qp-react-ui/dist -->
  <script src="./qp-react-ui.min.js"></script>
</head>
<body>
  ...
  <div id="search-component"></div>
  <script>
    ReactDOM.render(
      React.createElement(UIKit.Search, {
        API_KEY: 'your-api-key',
        onWellSelect: () => { /* Your select handler*/ }
      }),
      document.getElementById('search-component')
    )
  </script>
</body>
</html>
```
