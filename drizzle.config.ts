import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  // La DB es compartida con la app Momentos (photos, guests, posts...): limitar push a nuestra tabla.
  tablesFilter: ["invitations"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
