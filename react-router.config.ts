import { flatRoutes } from "@react-router/fs-routes";
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "app",
  ssr: false,
  routes: async () =>
    flatRoutes({
      ignoredRouteFiles: ["**/*.test.{js,jsx,ts,tsx}"],
    }),
} satisfies Config;
