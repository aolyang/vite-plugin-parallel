# vite-plugin-parallel

simply run vite parallel
just one command `pnpm dev` to run your component, micro app, libs and more.

:attention: this repo is far not ready, please consider `nx run-many` first.

```js
import { defineConfig } from 'vite'
import runVite from "vite-plugin-parallel"

export default defineConfig({
    plugins: [
        runVite("packages/lib"),
        runVite("packages/lib/vite.config.types.ts"),
        runVite("packages/electron/main"),
        runVite("packages/electron/preload"),
    ]
})
```

## current status

**testing**

## Issues

there is no one key down methods, you have to config more to work with.

It is because HMR in dev is DX better.

+ as dev:
  in default `vite.config.js` for dev, you must let your lib entry as alias
  ```js
  const config = {
    alias: {
       "@packages/lib-plus-1": join("packages/lib-plus-1/lib")
    }
  }
  ```
+ as build
  in build `vite.config.build.js` for production, you must give up alias and use `runVite` plugin.
  ```js
  const config = {
    plugins: [
      runVite("packages/your-lib")
    ]
  }
  ```

## more options


