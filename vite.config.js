import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
  test: {
    environment: 'jsdom',
    globals: true, // Allows using 'describe', 'it', 'expect' without importing
    setupFiles: './src/setupTests.js',
  },
})
