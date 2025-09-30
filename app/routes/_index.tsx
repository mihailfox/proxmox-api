import { useState } from 'react';

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">Proxmox API Toolkit</p>
        <h1>Remix meets Vite</h1>
        <p>
          This sandbox demonstrates how Remix can power interactive UI prototypes while keeping the
          familiar Vite developer experience.
        </p>
      </header>

      <section className="card">
        <p>The counter keeps local UI state hydrated through Remix&apos;s streaming runtime.</p>
        <div className="actions">
          <button type="button" onClick={() => setCount((value) => value + 1)}>
            Increment
          </button>
          <span className="value" aria-live="polite">
            {count}
          </span>
        </div>
      </section>
    </main>
  );
}
