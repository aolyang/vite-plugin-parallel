import React, { useState } from "react"
import { createRoot } from "react-dom/client"

import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { libPlus1 } from "@packages/lib-plus-1"
import { libPlus2 } from "@packages/lib-plus-2"
import { RcButton } from "@packages/rc-components";


const Content = () => {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo"/>
            </a>
            <a href="https://www.typescriptlang.org/" target="_blank">
                <img src={typescriptLogo} className="logo vanilla" alt="TypeScript logo"/>
            </a>
            <h1>Vite + TypeScript Component Playground</h1>
            <div className="card">
                <RcButton id="counter"  type="button" onClick={handleClick}>{count}</RcButton>
                <p id="plus-1">{count} + 1 = {libPlus1(count)}</p>
                <p id="plus-2">{count} + 2 = {libPlus2(count)}</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and TypeScript logos to learn more
            </p>
        </div>
    )
}
createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <Content/>
    </React.StrictMode>
)
