import { defineConfig } from 'vite'
import path from "node:path"
import runVite from "../../src/plugin"

const join = (dir: string) => path.join(__dirname, dir)

/* not yet */
/* TODO build */
export default defineConfig({
    root: __dirname,
    plugins: [
        runVite("packages/lib-plus-1"),
        runVite("packages/lib-plus-2"),
        runVite("packages/rc-components"),
        runVite("."),
        runVite("micros/micro-app")
    ]
})
