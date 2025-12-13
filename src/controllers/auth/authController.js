// src/controllers/auth/authController.js
const { PrismaClient } = require("@prisma/client"); // OJO: Tu ruta configurada
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro_cambialo_en_env";

// REGISTRO (Para crear los primeros usuarios)
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si ya existe
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ message: "El email ya está registrado" });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: rol || 'GESTIONADOR' // Por defecto
      }
    });

    res.status(201).json({ 
      success: true, 
      message: "Usuario creado", 
      user: { id: usuario.id, email: usuario.email, rol: usuario.rol } 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN (Para obtener el Token)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(400).json({ message: "Credenciales inválidas" });

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) return res.status(400).json({ message: "Credenciales inválidas" });

    // Crear Token
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol }, // Payload (datos dentro del token)
      JWT_SECRET,
      { expiresIn: '8h' } // Expira en 8 horas
    );

    res.json({
      success: true,
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};