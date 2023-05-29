import { defineConfig } from 'vite'
import path from "node:path"
import reactRefresh from "@vitejs/plugin-react"

import runVite from "../../src/plugin"

const join = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
    root: __dirname,
    resolve: {
        alias: {
            "@packages/lib-plus-1": join("packages/lib-plus-1"),
            "@packages/lib-plus-2": join("packages/lib-plus-2/src"),
            "@packages": join("packages")
        }
    },
    plugins: [
        reactRefresh(),
        runVite("playground"),
        runVite("micros/micro-app"),
    ]
})
