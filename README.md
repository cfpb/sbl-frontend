# Small Business Lending

A small app to explore Typescript, Vite and React.


## Features

- [Vite](https://vitejs.dev) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [PWA](https://github.com/antfu/vite-plugin-pwa) with [17/17 Lighthouse score](https://web.dev/pwa-checklist/).
- Write unit and integration tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).
- Write e2e tests with [Cypress](https://www.cypress.io).


## Getting started (Updated 08/26/2023)

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
1. In the `sbl-frontend` command line, type `sh start.sh`.


&NewLine;
- This project uses yarn v3.5 in "plug n play" mode. There is no `node_modules/` directory. Packages are stored in `.yarn/cache/`.



## Setting up your VS Code environment

If you'll be using VS Code, be sure to:

1. Open this `app/` dir in VS Code so that it's the workspace root. Otherwise imports may not work.
1. Install this project's [suggested plugins](.vscode/extensions.json) (you should see a VS Code pop-up).
1. Use the [workplace version of Typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) (you should see a VS Code pop-up). This is required and unfortunately [can't be automatically applied](https://stackoverflow.com/questions/74642723/how-do-i-force-vs-code-to-always-use-my-workspaces-version-of-typescript-for-al).


## Scripts

- `yarn dev` - start a development server with hot reload.
- `yarn build` - build for production. The generated files will be on the `dist` folder.
- `yarn preview` - locally preview the production build.
- `yarn test` - run unit and integration tests related to changed files based on git.
- `yarn test:ci` - run all unit and integration tests in CI mode.
- `yarn test:e2e` - run all e2e tests with the Cypress Test Runner.
- `yarn test:e2e:headless` - run all e2e tests headlessly.
- `yarn format` - format all files with Prettier.
- `yarn lint` - runs TypeScript, ESLint and Stylelint.
- `yarn validate` - runs `lint`, `test:ci` and `test:e2e:ci`.
