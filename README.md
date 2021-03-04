# TUI Application Test

This is a simple application for TUI Fronnt End job opportunity.

## Project Notes

Tecnologies used:

* Vue 3 + TypeScript
* Vite
* Windi CSS

Required Environment variables:

```
VUE_APP_WEATHER_API_KEY
VUE_APP_HOTEL_API_KEY
VUE_APP_HOTEL_API_SECRET
```

* `VUE_APP_WEATHER_API_KEY`: Weather API Key (https://www.weatherapi.com/)
* `VUE_APP_HOTEL_API_KEY`:  Amadeus API Key (https://developers.amadeus.com/)
* `VUE_APP_HOTEL_API_SECRET`:  Amadeus API Secret



## Development

Make a copy of `.env.sample` file to `.env` file in order to obtain the correct environment variables to test/develop application.


### Setup


Install necessary dependencies:

```
npm install
```

### Run Project (Development mode)

```
npm run dev
```

## Building

```
npm run build
```

```
npm run serve
```

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

#### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

#### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

#### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"
