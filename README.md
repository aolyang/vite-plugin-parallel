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

## more options


