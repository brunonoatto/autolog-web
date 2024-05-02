import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import IstanbulPlugin from 'vite-plugin-istanbul';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: process.env.USE_BABEL_PLUGIN_ISTANBUL ? true : false,
  },
  define: {
    'process.env': process.env,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    ...(process.env.USE_BABEL_PLUGIN_ISTANBUL
      ? [
          IstanbulPlugin({
            include: 'src',
            exclude: ['node_modules', 'src/e2e'],
          }),
        ]
      : []),
  ],
  // deu erro =/
  // server: {
  //   open: true,
  // },
});
