# Firestitch Component Boilerplate

## How to use

```bash
git clone https://github.com/Firestitch/component-boilerplate.git
cd componenent-boilerplate
git submodule init
git submodule update
npm install
npm run serve
```

For create your own library just start coding into `./src` folder and test how it works in
`./playground`. They are separated angular modules for library sources and testing.

Folders in `src` folder must contain `index.ts` files which contain exports for all your components/services and etc. like in this example.

### Commands:
- `npm run serve` - for start webpack developer server

- `npm run lint` - for check before upload to NPM

- `npm run package` - for build your package for NPM

