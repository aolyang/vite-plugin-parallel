import { PluginOption } from "vite";

type RunViteOptions = {

}
function runVite(dir: string): PluginOption
function runVite(options: RunViteOptions): PluginOption
function runVite(options: any): PluginOption {

    return {
        name: "run-vite"
    }
}

export default runVite
export {
    runVite
}