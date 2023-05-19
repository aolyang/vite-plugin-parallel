import { defineConfig } from 'vite'

export default defineConfig((env) => ({
    build: {
        watch: env.command === "serve" ? {} : false,
        lib: {
            name: "index",
            entry: "index.ts",
            formats: ["cjs"]
        }
    }
}))
