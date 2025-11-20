const express = require('express');
require('dotenv').config();
const { testConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Cuestionarios funcionando' });
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  await testConnection();
});