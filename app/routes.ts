import { flatRoutes } from "@react-router/fs-routes";
import type { RouteConfig } from "@react-router/dev/routes";

const routes = await flatRoutes({
  ignoredRouteFiles: ["**/*.test.{js,jsx,ts,tsx}"],
});

export default routes satisfies RouteConfig;
