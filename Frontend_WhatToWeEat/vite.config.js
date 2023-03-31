import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver(), IconsResolver()],
    }),
    Icons({ autoInstall: true }),
  ],
  resolve: {
    // eslint-disable-next-line no-undef
    alias: { "@/": `${path.resolve(__dirname, "src")}/` },
  },
});
