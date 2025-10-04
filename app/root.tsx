import type { LinksFunction, MetaFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";

import globalStylesheetUrl from "./styles/root.css?url";
import swaggerStylesheetUrl from "swagger-ui-react/swagger-ui.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesheetUrl },
  { rel: "stylesheet", href: swaggerStylesheetUrl },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export const meta: MetaFunction = () => [
  { title: "Proxmox API Viewer" },
  {
    name: "description",
    content: "Interactive playground for experimenting with Proxmox API tooling UI flows.",
  },
];

export default function App() {
  return (
    <html lang="en" className="theme-light">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <title>{`${error.status} ${error.statusText}`}</title>
          <Meta />
          <Links />
        </head>
        <body className="error">
          <main>
            <h1>{error.status}</h1>
            <p>{error.statusText}</p>
          </main>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Unexpected error</title>
        <Meta />
        <Links />
      </head>
      <body className="error">
        <main>
          <h1>Something went wrong</h1>
          <p>{error instanceof Error ? error.message : "Unknown error"}</p>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
