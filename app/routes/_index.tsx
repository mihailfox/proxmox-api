import { useEffect, useState } from 'react';

type SwaggerUIProps = import('swagger-ui-react').SwaggerUIProps;
type SwaggerUIComponent = import('react').ComponentType<SwaggerUIProps>;

export default function Index() {
  const [SwaggerUI, setSwaggerUI] = useState<SwaggerUIComponent | null>(null);

  useEffect(() => {
    let isActive = true;

    void import('swagger-ui-react').then((module) => {
      if (isActive) {
        setSwaggerUI(() => module.default as SwaggerUIComponent);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">Proxmox API Toolkit</p>
        <h1>Browse the OpenAPI specification</h1>
        <p>
          Load the generated Proxmox VE OpenAPI document directly inside this sandbox UI. Use the
          navigation pane to inspect operations, schemas, and request payloads.
        </p>
      </header>

      <section className="viewer" aria-label="Proxmox OpenAPI viewer">
        {SwaggerUI ? (
          <SwaggerUI
            url="/openapi.json"
            docExpansion="list"
            defaultModelsExpandDepth={1}
            defaultModelExpandDepth={2}
            deepLinking
          />
        ) : (
          <div className="viewer-loading" aria-live="polite">
            <p>Loading OpenAPI viewer…</p>
            <p className="hint">
              If the specification does not load, ensure `npm run openapi:generate` has produced
              <code>docs/openapi/proxmox-ve.json</code>.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
