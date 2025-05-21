import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
const CSS_MODULE_LOCAL_IDENT_NAME = "[local]_[hash:base64:5]";
import { generateScopedNameFactory } from "@dr.pogodin/babel-plugin-react-css-modules/utils";

export default defineConfig({
  server: {
    port: 3010,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 如需自定义组件其他 token, 在此处配置
        },
      },
    },
    modules: {
      generateScopedName: generateScopedNameFactory(CSS_MODULE_LOCAL_IDENT_NAME), // 自定义生成的类名
      localsConvention: "camelCase",
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@dr.pogodin/babel-plugin-react-css-modules',
            {
              generateScopedName: generateScopedNameFactory(CSS_MODULE_LOCAL_IDENT_NAME),
              attributeNames: { activeStyleName: 'activeClassName' },
              filetypes: {
                '.less': {
                  syntax: 'postcss-less',
                },
              },
              webpackHotModuleReloading: true,
              exclude: 'node_modules',
              handleMissingStyleName: 'warn',
            },
          ],
        ],
      },
    }),
  ],
});
