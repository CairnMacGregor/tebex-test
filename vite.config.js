import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteFonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
      exclude: ['js-big-decimal']
    },
    plugins: [
        vue(),
        ViteFonts({
            google: {
                families: [
                    {
                        name: "Lato",
                        styles: "wght@400;700",
                    },
                ],
            },
        }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/_main.scss";`
        }
      }
    },
    server: {
        port: 8080,
        proxy: {
            "^/api/.*": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
