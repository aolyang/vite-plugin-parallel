import viteLogo from "/vite.svg"
import "./style.css"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>micro app</h1>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo 12" />
    </a>
  </div>
`

