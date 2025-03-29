import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:'postgresql://accounts:npg_f5uaRT2OsciN@ep-broad-morning-a8s27o5k-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require',
  },
});
