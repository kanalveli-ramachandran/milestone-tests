# E2E Test Project

Collection of tests for Milestone 2

const indexLink = "file:///Users/user/milestone-tests/src/index.html"; 

// Please modify this as where you've stored the student project -> index.html will be the starting page for all tests.


## Installation

please install nvm and then `nvm use` -> If needed, install the specified node version as requested

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