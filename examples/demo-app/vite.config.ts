import { defineConfig } from 'vite'
import path from "node:path"

import runVite from "../../src/plugin"

const join = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
    root: __dirname,
    plugins: [
        runVite(join("../demo-app2")),
        runVite(join("../lib"))
    ]
})
