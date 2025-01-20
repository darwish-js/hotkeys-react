import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { resolve } from "path";

const isLib = process.env.BUILD_LIB === "true";
console.log({ isLib });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  build: isLib
    ? {
        copyPublicDir: false,
        lib: {
          entry: resolve(__dirname, "lib/main.ts"),
          formats: ["es"],
          name: "useHotkeys",
        },
        rollupOptions: {
          external: ["react", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      }
    : {
        outDir: "dist-app",
      },
});
