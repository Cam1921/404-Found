const express = require("express");
require("dotenv").config();

// Rutas
const authRoutes = require("./routes/auth/auth"); // <--- Nueva ruta
const catalogosRoutes = require("./routes/catalogos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Rutas Públicas (Login y Registro)
app.use("/api/auth", authRoutes);

// 2. Rutas Protegidas (Catalogos)
// Aquí decimos: "Para usar /api, primero verifica el token"
const { verifyToken } = require("./middlewares/auth/authMiddleware");
app.use("/api", verifyToken, catalogosRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});