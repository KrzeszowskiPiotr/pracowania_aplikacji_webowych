import { defineConfig } from "prisma";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    provider: "mysql",
    url: process.env.DATABASE_URL,
  },
  generator: {
    client: { provider: "prisma-client-js" }
  }
});
