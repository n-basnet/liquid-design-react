# Contributing

## Quick start

1. install dependencies - `$ yarn`
1. start the package development - `$ yarn start`
1. start the storybook dev environment - `$ yarn run start-storybook`
1. run tests - `$ npm run test:watch`

This repo is using [Commitizen](http://commitizen.github.io/cz-cli/) to enforce [conventional commit messages](http://conventionalcommits.org/) - please use `$ npm run cm` instead of `$ git commit`

## Adding new components

Use `$ npm run add-component` to quickly bootstrap new components

## Static build of storybook

1. `$ npm run build-storybook`
2. serve the static assets from `out` (e.g. `cd out && npx http-server`)

## Code style

This repo uses [JavaScript Standard Style](https://standardjs.com/)
