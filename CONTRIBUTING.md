# How To Contribute

## Installation

- `git clone <repository-url>`
- `cd ember-validated-form`
- `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Running tests

Since `ember-validated-form` uses build time configuration, there are various
test scenarios which can't be tested in the same run as the build changes each
time. The following scenarios exist and contain tests:

- `THEME_UIKIT`, tests UIkit specific code
- `THEME_BOOTSTRAP`, tests Bootstrap specific code
- `THEME_DEFAULT`, tests theme unspecific code
- `CUSTOM_COMPONENTS`, tests custom default components

In order to be sure that the written code works, the developer needs to make
sure that each scenario succeeds. For that, `ember-try` was configured
accordingly to test each of those scenarios:

- `ember try:each` – Runs the test suite on the current Ember version
- `TEST_SCENARIO=[...] ember test --server` – Runs the test suite with the given scenario in "watch mode"
- `EMBER_SCENARIO=[...] ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

- `pnpm start`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
