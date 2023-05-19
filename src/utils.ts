import fs from "node:fs"
import path from "node:path"

export const lastDirectories = (dir: string, last: number = 2) => path.dirname(dir).split(path.sep).slice(-last).join(path.sep)

export const concatConfigFile = (dir: string) => {
    if (fs.existsSync(dir) && fs.statSync(dir).isFile()) return { isFile: true, dir }
    else {
        const ext = [".js", ".ts"].find(ext => fs.existsSync(path.join(dir, "vite.config" + ext)))
        if (ext) return {
            isFile: true,
            dir: path.join(dir, "vite.config" + ext)
        }
        return {
            isFile: false,
            dir
        }
    }
}
