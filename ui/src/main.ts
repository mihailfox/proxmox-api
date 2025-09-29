import './style.css';
import { setupCounter } from './counter';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Root element #app was not found');
}

app.innerHTML = `
  <h1>Proxmox API Toolkit</h1>
  <p>Launch the developer sandbox and iterate quickly with Vite + Vitest.</p>
  <button type="button" id="counter"></button>
`;

const counterElement = document.querySelector<HTMLButtonElement>('#counter');

if (!counterElement) {
  throw new Error('Counter element was not rendered');
}

setupCounter(counterElement);
