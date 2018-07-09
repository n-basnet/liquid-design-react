# liquid-design-react

> Liquid Design System components for React

[![NPM](https://img.shields.io/npm/v/liquid-design-react.svg)](https://www.npmjs.com/package/liquid-design-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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
  render () {
    return (
      <Theme>
        <Badge text='Hello' />
      </Theme>
    )
  }
}
```

## Contributing

1. install dependencies - `$ yarn`
1. start the package development - `$ yarn start`
1. start the storybook dev environment - `$ yarn run start-storybook`
1. run tests - `$ npm run test:watch`

This repo is using [Commitizen](http://commitizen.github.io/cz-cli/) to enforce [conventional commit messages](http://conventionalcommits.org/) - please use `$ npm run cm` instead of `$ git commit`

### Adding new components

Use `$ npm run add-component` to quickly bootstrap new components

### Static build of storybook

1. `$ npm run build-storybook`
2. serve the static assets from `out` (e.g. `cd out && npx http-server`)

### SVG icons

are optimised using [svgo](https://github.com/svg/svgo) - run `$ npm run prepare-svgs` to optimise files stored in `src/graphics/svgIcons`

## License

MIT ©
