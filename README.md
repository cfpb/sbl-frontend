# Small Business Lending

A small app to explore Typescript, Vite and React.

## Features

- [Vite](https://vitejs.dev) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [PWA](https://github.com/antfu/vite-plugin-pwa) with [17/17 Lighthouse score](https://web.dev/pwa-checklist/).
- Write unit and integration tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).
- Write e2e tests with [Cypress](https://www.cypress.io).

## Getting started (Updated 12/13/2023)

1. Install Node v16.9+: `nvm install && nvm use`
1. Enable [corepack](https://yarnpkg.com/getting-started/install): `corepack enable`.
1. [Docker](https://docs.docker.com/get-docker/) engine version 1.13.0+ with docker compose version 3.0+ support needs to be installed to run all the containerized support services.
1. Have the three repos [sbl-frontend](https://github.com/cfpb/sbl-frontend), [sbl-project](https://github.com/cfpb/sbl-project), and [regtech-user-fi-management](https://github.com/cfpb/regtech-user-fi-management) as **sibling directories**.
   ```
   code-root
   ├── regtech-user-fi-management
   ├── sbl-project
   └── sbl-frontend (current repository)
   ```
1. Make sure to `git pull` in each of the three directories to have the latest commits.
1. Create a `.env` based on the [ENV-GUIDE.md](./ENV-GUIDE.md).
1. In the `sbl-frontend` command line, run `yarn start`. This script uses `docker-compose` to start up Docker containers of all of the project components (User management, API, Frontend) to get you up and running.

&NewLine;

- This project uses yarn v3.5 in "plug n play" mode. There is no `node_modules/` directory. Packages are stored in `.yarn/cache/`.

## Setting up your VS Code environment

If you'll be using VS Code, be sure to:

1. Open this `app/` dir in VS Code so that it's the workspace root. Otherwise imports may not work.
1. Install this project's [suggested plugins](.vscode/extensions.json) (you should see a VS Code pop-up).
1. Use the [workspace version of Typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) (you should see a VS Code pop-up). This is required and unfortunately [can't be automatically applied](https://stackoverflow.com/questions/74642723/how-do-i-force-vs-code-to-always-use-my-workspaces-version-of-typescript-for-al).


## Seeding, Resetting, Creating Keycloak users

### Prerequisites
1. Follow the [Getting started](https://github.com/cfpb/sbl-frontend/blob/main/README.md#getting-started-updated-12132023) instructions to get `Docker` and have the three directories as **sibling directories**.
1. Have `poetry`, `alembic`, `libpq`, `jq` and `alembic` installed.

### Scripts relating to seeding explained
- `yarn seed_db` executes the commands to fill the basic tables (i.e. `address_states`, `federal_regulator`, `sbl_institution_type`)[regtech reset_and_seed](https://github.com/cfpb/regtech-user-fi-management/blob/main/db_revisions/dev_setup.sh) and creates the [mocked financial institutions](https://github.com/cfpb/sbl-project/tree/main/dev_setup/mock_data).

- `yarn wipe_db` complete wipes all tables and mocked institutions

### Create Keycloak users (if needed)
- The instructions to do this are found [here](https://github.com/cfpb/sbl-project/blob/main/dev_setup/mock_data/README.md#create-users-via-keycloak)

## Scripts

- `yarn dev` - start a development server with hot reload.
- `yarn build` - build for production. The generated files will be on the `dist` folder.
- `yarn preview` - locally preview the production build.
- `yarn start` - start the app's full stack (auth, api, frontend) via `docker-compose`
- `yarn test` - run unit and integration tests related to changed files based on git.
- `yarn test:ci` - run all unit and integration tests in CI mode.
- `yarn test:e2e` - run all e2e tests with the Cypress Test Runner.
- `yarn test:e2e:headless` - run all e2e tests headlessly.
- `yarn format` - format all files with Prettier.
- `yarn lint` - runs TypeScript, ESLint and Stylelint.
- `yarn validate` - runs `lint`, `test:ci` and `test:e2e:ci`.
- `yarn seed_db` - seeds (or resets) the databases with mocked data
- `yarn wipe_db` - removes all tables and institutions
