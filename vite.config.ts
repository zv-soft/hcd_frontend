import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
	],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    rollupOptions: {
      // Establece un tamaño máximo para los chunks. Puedes ajustar esto según tus necesidades.
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // Nombre de los archivos de los chunks
        entryFileNames: 'js/[name]-[hash].js', // Nombre de los archivos de entrada
        assetFileNames: 'assets/[name]-[hash].[ext]', // Nombre de los archivos de activos
        manualChunks(id) {
          // Define manualChunks para controlar la división de chunks de manera personalizada.
          if (id.includes('node_modules')) {
            return 'vendor'; // Agrupa las dependencias de node_modules en un chunk llamado "vendor".
          }
        },
      },
    },
     chunkSizeWarningLimit: 1600, // Ajusta este valor según tus necesidades.
  }
})
