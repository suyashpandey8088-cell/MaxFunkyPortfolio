import { defineConfig } from 'vite';

// base './' keeps asset URLs relative — works on GitHub Pages project
// sites, custom domains and local `vite preview` alike.
export default defineConfig({
  base: './',
  // allow sandbox/preview proxies (e.g. *.e2b.app) to reach the dev server
  server: {
    allowedHosts: ['.e2b.app'],
  },
  build: {
    target: 'es2019',
    cssCodeSplit: false
  }
});
