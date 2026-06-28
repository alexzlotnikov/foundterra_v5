import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { installStartupDiagnostics } from './utils/startupDiagnostics';
import './index.css';

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

installStartupDiagnostics();

if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
