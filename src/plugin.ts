import type { ConfigEnv, InlineConfig, LogLevel, PluginOption, UserConfig } from "vite"
import { build, createLogger, createServer, resolveConfig } from "vite"

import path from "node:path"

import { concatConfigFile, lastDirectories } from "./utils";

type RunViteOptions = {
    configFile: string
    logLevel?: LogLevel
}

export default function runVite(project: string): PluginOption[]
export default function runVite(options: RunViteOptions): PluginOption[]
export default function runVite(options: string | RunViteOptions): PluginOption [] {
    const runOptions = typeof options === "string" ? { configFile: options } : options

    if (!runOptions.configFile) throw Error("[vite-plugin-parallel]: ConfigFile should be specified, but found nothing!")

    const { isFile, dir } = concatConfigFile(runOptions.configFile)
    runOptions.configFile = dir

    const pluginRoot = lastDirectories(runOptions.configFile)
    const rootPrefix = `[root ${lastDirectories(__dirname, 1)}]`
    const parallelPrefix = `[parallel ${pluginRoot}]`

    const resolveInlineConfig = (config: UserConfig, env: ConfigEnv): InlineConfig => {
        return {
            configFile: isFile ? runOptions.configFile : false,
            root: path.dirname(runOptions.configFile),
            mode: env.mode,
            logLevel: runOptions.logLevel,
            customLogger: createLogger(runOptions.logLevel, {
                prefix: parallelPrefix
            })
        }
    }
    return [
        {
            name: "vite-plugin-parallel" + parallelPrefix,
            apply: "serve",
            config: async (config, env) => {
                config.customLogger = createLogger(config.logLevel, { prefix: rootPrefix })

                const inlineConfig = resolveInlineConfig(config, env)
                const resolved = await resolveConfig(inlineConfig, env.command)

                if (resolved.build.lib) {
                    inlineConfig.build = { watch: {} }
                    inlineConfig.plugins = [
                        {
                            name: "vite-plugin-parallel" + parallelPrefix + " build change ",
                            buildEnd: async () => {
                                inlineConfig.customLogger?.info(" =========== lib buildEnd")
                            }

                        }
                    ] as PluginOption[]
                    await build(inlineConfig)
                } else {
                    const server = await createServer(inlineConfig)
                    await server.listen()
                    server.config.logger.info("server started")
                    server.printUrls()
                }
            },
        },
        {
            name: "vite-plugin-parallel",
            apply: "build",
            config: async (config, env) => {
                await build(resolveInlineConfig(config, env))
            },

        }
    ]
}

export {
    runVite
}
