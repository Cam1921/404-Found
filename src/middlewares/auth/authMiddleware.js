// src/middlewares/auth/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro_cambialo_en_env";

// 1. Verificar si tiene Token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // El token suele venir como "Bearer eyJhbGci..."
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado. No se proporcionó token." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en la petición
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

// 2. Verificar si tiene el Rol permitido
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ 
        message: `Acceso prohibido. Se requiere uno de los siguientes roles: ${allowedRoles.join(', ')}` 
      });
    }
    next();
  };
};