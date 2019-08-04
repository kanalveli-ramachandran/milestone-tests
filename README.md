# E2E Test Project

Collection of tests for Milestone 2

We've added a sample test code from another student into the `src` directory. Please replace that with the students test folder's content before running the test.

Please ensure that an index.html is present. Also, the tests have been written with the given mocks and filenames as the pattern. Any deviations will result in test failures

## Installation

please install nvm and then `nvm use` -> If needed, install the specified node version as requested ie, `nvm install 10.13.0`

If you exported the project into this directory for the first time, please run `npm install` to install dependencies.

After running the tests `npm test`, you can find the generated screenshots in the `screenshots` directory.

## Available Automation Commands
- `npm test` - run tests in command-line
- `npm run test:debug` - run tests in command-line and in browser


## Note
You can pass additional arguments to pass to the browser instance by using env variable `PUPPETEER_LAUNCHER_ARGS` like:
```
npx cross-env PUPPETEER_RUN_IN_BROWSER=true PUPPETEER_LAUNCHER_ARGS="--start-maximized --ignore-certificate-errors" jest
```
[List of Chromium Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/)

Use `PUPPETEER_DEVTOOLS` env variable to enable DevTools