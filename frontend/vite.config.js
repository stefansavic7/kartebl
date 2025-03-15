/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import history from 'connect-history-api-fallback'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-history-api-fallback',
      configureServer(server) {
        server.middlewares.use(
          history({
            // disableDotRule allows paths containing dots (.) to be handled correctly
            disableDotRule: true,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          })
        )
      }
    }
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})

