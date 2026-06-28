import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

const prerenderedMarkup = root.hasChildNodes() ? root.innerHTML : "";
let prerenderShell: HTMLDivElement | null = null;

if (prerenderedMarkup) {
  prerenderShell = document.createElement("div");
  prerenderShell.id = "prerender-shell";
  prerenderShell.innerHTML = prerenderedMarkup;
  root.before(prerenderShell);
  root.replaceChildren();
  root.hidden = true;
}

createRoot(root).render(<App />);

if (prerenderShell) {
  const revealClientApp = () => {
    if (!root.querySelector("main")) return false;
    root.hidden = false;
    prerenderShell?.remove();
    prerenderShell = null;
    return true;
  };

  if (!revealClientApp()) {
    const observer = new MutationObserver(() => {
      if (revealClientApp()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });
  }
}
