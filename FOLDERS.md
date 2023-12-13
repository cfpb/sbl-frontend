## Project structure for SBL-Frontend

```
├── node_modules (.gitignore)
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── hooks
│   │   ├── useClickOutside.ts
│   │   └── index.ts
│   ├── store
│   │   ├── useNavBarState.tsx
│   │   └── index.ts
│   ├── api
│   │   ├── useLAR.ts
│   │   ├── keycloak.ts
│   │   └── index.ts
│   ├── components
│   │   ├── componentA
│   │   │   ├── componentA.tsx
│   │   │   ├── childOfComponentA.tsx
│   │   │   ├── componentA.test.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── utils
│   │   ├── ...
│   │   └── index.ts
│   ├── index.js
│   ├── serviceWorker.js
│   └── setupTests.js
├── .gitignore
├── package.json
└── README.md
└── yarn.lock
```
