import type { ConfigEnv, InlineConfig, Logger, LogLevel, PluginOption, UserConfig } from "vite"
import { build, createLogger, createServer, resolveConfig } from "vite"

import path from "node:path"

import { concatConfigFile, lastDirectories } from "./utils";

type RunViteOptions = {
    configFile: string
    logLevel?: LogLevel
}
let logger: Logger

export default function runVite(project: string): PluginOption[]
export default function runVite(options: RunViteOptions): PluginOption[]
export default function runVite(options: string | RunViteOptions): PluginOption [] {
    const runOptions = typeof options === "string" ? { configFile: options } : options

    if (!runOptions.configFile) throw Error("[vite-plugin-parallel]: ConfigFile should be specified, but found nothing!")

    const { isFile, dir } = concatConfigFile(runOptions.configFile)
    runOptions.configFile = dir

    const pluginRoot = lastDirectories(runOptions.configFile)

    const createCustomLogger = (config: UserConfig) => {
        console.log("create logger", `[root ${lastDirectories(__dirname, 1)}]`)
        config.customLogger = createLogger(config.logLevel, {
            prefix: `[root ${lastDirectories(__dirname, 1)}]`,
            // customLogger: logger || config.customLogger,
            // allowClearScreen: false
        })
        // logger = config.customLogger
    }
    const resolveInlineConfig = (config: UserConfig, env: ConfigEnv): InlineConfig => {

        console.log("create logger", `[parallel ${lastDirectories(pluginRoot)}]`)
        return {
            configFile: isFile ? runOptions.configFile : false,
            root: path.dirname(runOptions.configFile),
            mode: env.mode,
            logLevel: runOptions.logLevel,
            customLogger: createLogger(runOptions.logLevel, {
                prefix: `[parallel ${pluginRoot}]`,
                // allowClearScreen: false,
                // customLogger: config.customLogger
            })
        }
    }
    return [
        {
            name: "vite-plugin-parallel",
            apply: "serve",
            config: async (config, env) => {
                createCustomLogger(config)

                const inlineConfig = resolveInlineConfig(config, env)
                const resolved = await resolveConfig(inlineConfig, env.command)

                if (resolved.build.lib) {
                    inlineConfig.build = { watch: {} }
                    await build(inlineConfig)
                } else {
                    const server = await createServer(inlineConfig)
                    await server.listen()
                    server.printUrls()
                }
            },
        },
        {
            name: "vite-plugin-parallel",
            apply: "build",
            config: async (config, env) => {
                createCustomLogger(config)
                await build(resolveInlineConfig(config, env))
            },

        }
    ]
}

export {
    runVite
}
