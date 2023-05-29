# vite-plugin-parallel

simply run vite parallelly

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


