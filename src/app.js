// src/app.js
const express = require("express");
const spdy = require("spdy"); 
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Rutas
const authRoutes = require("./routes/auth/auth");
const catalogosRoutes = require("./routes/catalogos");

// Base de datos (tu config antigua para los controladores que usan pg)
const { testConnection } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// --- RUTAS ---
app.use("/api/auth", authRoutes);

// Middleware de seguridad para rutas protegidas
const { verifyToken } = require("./middlewares/auth/authMiddleware");
app.use("/api", verifyToken, catalogosRoutes);

// Ruta de prueba simple
app.get("/", (req, res) => {
  res.json({ mensaje: "¡Servidor Seguro HTTP/2 funcionando! 🔒🚀" });
});

// --- INICIO DEL SERVIDOR SEGURO ---
const startServer = async () => {
  try {
    // 1. Cargar los certificados que acabas de crear con OpenSSL
    const certPath = path.join(__dirname, "../server.cert");
    const keyPath = path.join(__dirname, "../server.key");

    // Verificar que existan (por seguridad)
    if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
      throw new Error("⚠️ No encuentro server.key o server.cert. ¿Seguro que están en la raíz?");
    }

    const options = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };

    // 2. Crear servidor SPDY (HTTP/2 + HTTPS)
    const server = spdy.createServer(options, app);

    server.listen(PORT, async () => {
      console.log(`🔒 Servidor HTTP/2 corriendo en https://localhost:${PORT}`);
      await testConnection();
    });

  } catch (error) {
    console.error("❌ Error al iniciar:", error.message);
  }
};

startServer();