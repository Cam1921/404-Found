const express = require("express")
require("dotenv").config()
const { testConnection } = require("./config/db")

// Importar rutas de catalogos
const catalogosRoutes = require("./routes/catalogos")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware para parsear JSON
app.use(express.json())

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Cuestionarios funcionando" })
})

// Usar rutas de catalogos
app.use("/api", catalogosRoutes)

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  await testConnection()
})
