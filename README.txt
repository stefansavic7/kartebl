pokretanje:

    frontend:

        npm install
        npm run dev
    backend:
        ./mvnw spring-boot:run


povezivanje fronta i becka:

vite je na portu localhost:5173
backend je na localhost:8080

u vite.config.js:

export default {
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
}



git init
echo "node_modules/" >> frontend/.gitignore
echo "target/" >> backend/.gitignore
