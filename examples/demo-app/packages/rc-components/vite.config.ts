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
        rollupOptions: {
            external: ["react"]
        },
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs'],
            fileName: format => format === 'es' ? 'index.mjs' : 'index.js',
        }
    }
})
