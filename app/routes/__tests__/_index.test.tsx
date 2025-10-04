import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";

import Index from "../_index";

vi.mock("swagger-ui-react", () => ({
  default: () => null,
}));

describe("Index route", () => {
  it("renders the OpenAPI viewer heading and loading state", () => {
    const html = renderToString(<Index />);
    expect(html).toContain("Browse the OpenAPI specification");
    expect(html).toContain("Loading OpenAPI viewer…");
  });
});
