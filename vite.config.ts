import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { installGlobals } from '@remix-run/node';
import { vercelPreset } from '@vercel/remix/vite';

installGlobals({ nativeFetch: true });

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_singleFetch: true,
      },
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
});
