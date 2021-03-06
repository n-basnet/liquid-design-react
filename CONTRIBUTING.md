# Contributing

## Quick start

1. install dependencies - `$ yarn`
1. start the package development - `$ yarn start`
1. start the storybook dev environment - `$ yarn storybook:start`
1. run tests - `$ yarn test:watch`

This repo is using [Commitizen](http://commitizen.github.io/cz-cli/) to enforce [conventional commit messages](http://conventionalcommits.org/) - please use `$ yarn cm` instead of `$ git commit`

## Adding new components

Use `$ yarn add-component` to quickly bootstrap new components.

## Static build of storybook

1. `$ yarn storybook:build`
2. serve the static assets from `out` (e.g. `cd out && npx http-server`)

## Code style

This repo uses [JavaScript Standard Style](https://standardjs.com/).

## Visual regression testing

is set up with [Loki](https://loki.js.org)
To run those tests locally, run `$ yarn test:loki`. If the tests fail, check out the differences in `.loki/difference` and if those differences are all intended, run `yarn test:loki:approve`.
After adding new stories to storybook, make sure to run `$ yarn test:loki:update`.

## Handling external CSS

External CSS (i.e. `animate.css` animations) is imported as string (`raw-loader` in webpack-bundled Storybook, `rollup-plugin-string` in rollup-bundled distribution package). This way we make no assumptions about user's CSS loader.

## releasing/publishing

Automated with [semantic-release](https://github.com/semantic-release/semantic-release). New releases will be published after pushing/merging to `master`. Because of how `semantic-release` works (analysing commit massages to compute the next version number), merge commits should be avoided (or at least the commit message should be following the conventional commit messages standard) and only fast-forward merges to master permitted.
