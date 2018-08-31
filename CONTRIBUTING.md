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

### SVG icons

are optimised using [svgo](https://github.com/svg/svgo) - run `$ yarn prepare-svgs` to optimise files stored in `src/assets/svgIcons`.

## Code style

This repo uses [JavaScript Standard Style](https://standardjs.com/).

## Visual regression testing

is set up with [Loki](https://loki.js.org)
To run those tests locally, run `$ yarn test:loki`. If the tests fail, check out the differences in `.loki/difference` and if those differences are all intended, run `yarn test:loki:approve`.
After adding new stories to storybook, make sure to run `$ yarn test:loki:update`.

## Handling external CSS

External CSS (i.e. `animate.css` animations) is imported as string (`raw-loader` in webpack-bundled Storybook, `rollup-plugin-string` in rollup-bundled distribution package). This way we make no assumptions about user's CSS loader.

## releasing/publishing

Automated with [semantic-release](https://github.com/semantic-release/semantic-release). To publish new version, push `production` branch to the repo after merging master to it. `semantic-release` on CI will take it from there.
One caveat though: after a release, `production` will be one commit ahead of master (consisting of `package.json` and `CHANGELOG.md` updates) - but as the master is protected, a PR is needed to sync `master` with `production`. CI will open a PR (using [hub](https://hub.github.com/)), but it will have to be approved and handled by a developer on GitHub.
