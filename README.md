# liquid-design-react

> Liquid Design System components for React. Design System and Component Kit to create beautifull applications.

[![NPM](https://img.shields.io/npm/v/liquid-design-react.svg)](https://www.npmjs.com/package/liquid-design-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Install

```bash
npm install --save liquid-design-react
```

## Usage

Wrap the root of your application with the `Theme` component to provide typographic defaults and global styles.

```jsx
import React, { Component } from 'react'

import { Badge, Theme } from 'liquid-design-react'

class Example extends Component {
  render() {
    return (
      <Theme>
        <Badge text='Hello' />
      </Theme>
    )
  }
}
```

## Documentation

You can find the liquid-design-react documentation on the [website](https://merck-react.staging.devguru.co/).

## Contributing

see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT ©
