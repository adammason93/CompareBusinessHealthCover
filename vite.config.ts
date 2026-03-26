import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { LCP_HERO_IMAGE_URL, POPPINS_LATIN_WOFF2 } from './src/config/lcp'

/** LCP image + critical fonts discoverable in the initial HTML (SPA-friendly). */
function injectLcpHints(): Plugin {
  return {
    name: 'inject-lcp-hints',
    enforce: 'pre',
    transformIndexHtml(html) {
      if (html.includes('data-lcp-prefetch')) return html
      const hints = `    <!-- LCP / font hints (injected by vite.config.ts) -->
    <link rel="preload" data-lcp-prefetch href="${LCP_HERO_IMAGE_URL}" as="image" fetchpriority="high" />
    <link rel="preload" href="${POPPINS_LATIN_WOFF2.w400}" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="${POPPINS_LATIN_WOFF2.w700}" as="font" type="font/woff2" crossorigin />
`
      return html.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${hints}`,
      )
    },
  }
}

/** Preload hashed entry CSS so the browser can start fetch in parallel with JS (post = runs after Vite injects links). */
function preloadEntryCss(): Plugin {
  return {
    name: 'preload-entry-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (html.includes('data-css-preload')) return html
        return html.replace(
          /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/,
          '<link rel="preload" data-css-preload href="$1" as="style" crossorigin />\n    <link rel="stylesheet" crossorigin href="$1">',
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    injectLcpHints(),
    preloadEntryCss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
  build: {
    // Emit .map files so Lighthouse can attribute issues to source; disable if you must not expose sources publicly.
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('recharts')) return 'recharts'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('node_modules/react-dom/')) return 'react-vendor'
          if (id.includes('node_modules/react/')) return 'react-vendor'
        },
      },
    },
  },
})