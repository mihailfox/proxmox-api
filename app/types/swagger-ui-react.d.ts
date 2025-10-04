declare module "swagger-ui-react" {
  import type { ComponentType } from "react";

  export type DocExpansionMode = "list" | "full" | "none";

  export interface SwaggerUIProps {
    url?: string;
    spec?: unknown;
    docExpansion?: DocExpansionMode;
    deepLinking?: boolean;
    defaultModelsExpandDepth?: number;
    defaultModelExpandDepth?: number;
    [key: string]: unknown;
  }

  const SwaggerUI: ComponentType<SwaggerUIProps>;

  export default SwaggerUI;
}
