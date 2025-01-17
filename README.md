# Small Business Lending

The frontend of the Small Business Lending Data Filing Platform.

## Features

- [Vite](https://vitejs.dev) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- Write unit and integration tests with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).
- Write e2e tests with [Playwright](https://playwright.dev/).

## Getting started (Updated 12/13/2023)

1. Install Node v22+: `nvm install 22 && nvm use 22`
1. Enable [corepack](https://yarnpkg.com/getting-started/install): `corepack enable`.
1. [Docker](https://docs.docker.com/get-docker/) engine version 1.13.0+ with docker compose version 3.0+ support needs to be installed to run all the containerized support services.
1. Have the six repos [sbl-frontend](https://github.com/cfpb/sbl-frontend), [sbl-project](https://github.com/cfpb/sbl-project), [regtech-user-fi-management](https://github.com/cfpb/regtech-user-fi-management), [sbl-filing-api](https://github.com/cfpb/sbl-filing-api/), [regtech-mail-api](https://github.com/cfpb/regtech-mail-api), and [regtech-cleanup-api](https://github.com/cfpb/regtech-cleanup-api) as **sibling directories**.

   ```
   code-root
   ├── regtech-cleanup-api
   ├── regtech-mail-api
   ├── regtech-user-fi-management
   ├── sbl-filing-api
   ├── sbl-project
   └── sbl-frontend (current repository)

   ```

1. Make sure to `git pull` in each of the six directories to have the latest commits.
1. Create a `.env` based on the [ENV-GUIDE.md](./ENV-GUIDE.md).
1. At the `sbl-frontend` command line, run `yarn start`. This script uses `docker-compose` to start up Docker containers of all of the project components (User management, API, Frontend) to get you up and running.
1. At the `sbl-frontend` command line, run `yarn seed` to generate the necessary mock data in the backend systems.

## Setting up your VS Code environment

If you'll be using VS Code, be sure to:

1. Open this `app/` dir in VS Code so that it's the workspace root. Otherwise imports may not work.
1. Install this project's [suggested plugins](.vscode/extensions.json) (you should see a VS Code pop-up).
1. Use the [workspace version of Typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) (you should see a VS Code pop-up). This is required and unfortunately [can't be automatically applied](https://stackoverflow.com/questions/74642723/how-do-i-force-vs-code-to-always-use-my-workspaces-version-of-typescript-for-al).

## Scripts

- `yarn dev` - start a development server with hot reload.
- `yarn build` - build for production. The generated files will be on the `dist` folder.
- `yarn preview` - locally preview the production build.
- `yarn start` - start the app's full stack (auth, api, frontend) via `docker-compose`
- `yarn update` - update all dependent repos and then start the app's full stack (auth, api, frontend) via `docker-compose`
- `yarn seed` - run all mock data generation scripts
- `yarn test` - run unit and integration tests related to changed files based on git.
- `yarn test:ci` - run all unit and integration tests in CI mode
- `yarn test:e2e` - run all e2e tests with Playwright UI mode.
- `yarn test:e2e:headless` - run all e2e tests headlessly.
- `yarn test:e2e:snapshot` - run all e2e tests with snapshot testing.
- `yarn test:e2e:snapshot-update` - update all snapshots.
- `yarn test:e2e:snapshot-update <TEST_PATH>` - update snapshots for specific tests. Example: `yarn test:e2e:snapshot-update e2e/pages/shared-lending-platform/UserProfile*`
- `yarn format` - format all files with Prettier.
- `yarn lint` - runs TypeScript, ESLint and Stylelint.
- `yarn validate` - runs `lint`, `test:ci` and `test:e2e`.

## Dev Tools

The following commands can be used from the browser console when in a dev environment:

- `logout()` - logs the current user out of Keycloak
- `toggleRouting()` - toggles routing logic on/off to allow a dev to view any page despite being logged out or having incorrect user profile data
- `setIsRoutingEnabled(true|false)` - sets routing logic on/off via a boolean parameter to allow a dev to view any page despite being logged out or having incorrect user profile data

## Running Playwright Tests

In order to run Playwright tests, you'll need to download the requisite browsers using the command: `yarn playwright install --with-deps`
