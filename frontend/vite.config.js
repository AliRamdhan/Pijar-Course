import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_ENVIRONMENT": JSON.stringify(
        env.REACT_APP_ENVIRONMENT
      ),
      "process.env.URL_BACKEND": JSON.stringify(env.URL_BACKEND),
      "process.env.URL_API_AUTH": JSON.stringify(env.URL_API_AUTH),
      "process.env.URL_HEADER_USER": JSON.stringify(env.URL_HEADER_USER),
      "process.env.URL_HEADER_COURSE": JSON.stringify(env.URL_HEADER_COURSE),
      "process.env.SECRET_KEY_JWT": JSON.stringify(env.SECRET_KEY_JWT),
    },

    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  };
});
