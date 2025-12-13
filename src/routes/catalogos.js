// src/routes/catalogos.js
const express = require("express");
const router = express.Router();
const catalogosController = require("../controllers/catalogosController");

// Importar el middleware de autorización
// Nota: Ajusta la ruta si tu estructura de carpetas es diferente
const { authorizeRoles } = require("../middlewares/auth/authMiddleware");

// ==========================================
// RUTAS DE CATEGORÍAS POR EDAD
// ==========================================

// Leer (Accesible para todos los usuarios logueados)
router.get("/categorias", catalogosController.getAllCategorias);
router.get("/categorias/:id", catalogosController.getCategoriaById);

// Crear y Editar (Solo ADMIN y EDITOR)
router.post("/categorias", authorizeRoles('ADMIN', 'EDITOR'), catalogosController.createCategoria);
router.put("/categorias/:id", authorizeRoles('ADMIN', 'EDITOR'), catalogosController.updateCategoria);

// Borrar (Solo ADMIN)
router.delete("/categorias/:id", authorizeRoles('ADMIN'), catalogosController.deleteCategoria);


// ==========================================
// RUTAS DE DIFICULTADES
// ==========================================

router.get("/dificultades", catalogosController.getAllDificultades);

// Crear (Solo ADMIN y EDITOR)
router.post("/dificultades", authorizeRoles('ADMIN', 'EDITOR'), catalogosController.createDificultad);


// ==========================================
// RUTAS DE ÁREAS
// ==========================================

router.get("/areas", catalogosController.getAllAreas);
router.get("/areas/:id", catalogosController.getAreaById);

// Crear (Solo ADMIN y EDITOR)
router.post("/areas", authorizeRoles('ADMIN', 'EDITOR'), catalogosController.createArea);


// ==========================================
// RUTAS DE SUBAREAS
// ==========================================

router.get("/subareas", catalogosController.getAllSubareas);
router.get("/areas/:area_id/subareas", catalogosController.getSubareasByArea);

// Crear y Editar (Solo ADMIN y EDITOR)
router.post("/subareas", authorizeRoles('ADMIN', 'EDITOR'), catalogosController.createSubarea);
router.put("/subareas/:id", authorizeRoles('ADMIN', 'EDITOR'), catalogosController.updateSubarea);

// Borrar (Solo ADMIN)
router.delete("/subareas/:id", authorizeRoles('ADMIN'), catalogosController.deleteSubarea);

module.exports = router;