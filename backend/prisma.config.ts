import { ENV } from "./src/config/env";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: ENV.DATABASE_URL,
  },
});
