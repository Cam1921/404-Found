const express = require("express")
const router = express.Router()
const catalogosController = require("../controllers/catalogosController")

// CATEGORÍAS POR EDAD
router.get("/categorias", catalogosController.getAllCategorias)
router.get("/categorias/:id", catalogosController.getCategoriaById)
router.post("/categorias", catalogosController.createCategoria)
router.put("/categorias/:id", catalogosController.updateCategoria)
router.delete("/categorias/:id", catalogosController.deleteCategoria)

// DIFICULTADES
router.get("/dificultades", catalogosController.getAllDificultades)
router.post("/dificultades", catalogosController.createDificultad)

// ÁREAS
router.get("/areas", catalogosController.getAllAreas)
router.get("/areas/:id", catalogosController.getAreaById)
router.post("/areas", catalogosController.createArea)

// SUBAREAS
router.get("/subareas", catalogosController.getAllSubareas)
router.get("/areas/:area_id/subareas", catalogosController.getSubareasByArea)
router.post("/subareas", catalogosController.createSubarea)
router.put("/subareas/:id", catalogosController.updateSubarea)
router.delete("/subareas/:id", catalogosController.deleteSubarea)

module.exports = router
