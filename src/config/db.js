// src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Usamos la misma variable que usa Prisma para no duplicar configuración
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL (Modo Pool)');
    client.release();
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error.message);
  }
};

module.exports = { pool, testConnection };