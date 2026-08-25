import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { consoleLines } from '@/data/eggs'
import '@/styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('#root is missing from index.html')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (import.meta.env.PROD || !('__ttGreeted' in window)) {
  Object.defineProperty(window, '__ttGreeted', { value: true })
  const style = 'color:#c8fa4b;font:600 12px/1.6 ui-monospace,monospace'
  const dim = 'color:#767d87;font:400 12px/1.6 ui-monospace,monospace'
  console.log('%c kolokithes A.E. %c — me.thomast.uk', style, dim)
  consoleLines.forEach((line) => console.log(`%c${line}`, dim))
}
