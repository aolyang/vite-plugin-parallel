import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"

export default defineConfig({
    base: "./",
    plugins: [
        dts({
            rollupTypes: true
        })
    ],
    build: {
        sourcemap: false,
        minify: false,
        lib: {
            entry: './lib.ts',
            formats: ['es', 'cjs'],
            fileName: format => format === 'es' ? 'index.mjs' : 'index.js',
        }
    }
})
