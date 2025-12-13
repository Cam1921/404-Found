//  src/controllers/catalogosController.js
const { pool } = require("../config/db")

// ===== CATEGORÍAS POR EDAD =====

exports.getAllCategorias = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categorias_edad ORDER BY id ASC")
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    res.status(500).json({
      success: false,
      message: "Error al obtener categorías",
      error: error.message,
    })
  }
}

exports.getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query("SELECT * FROM categorias_edad WHERE id = $1", [id])
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      })
    }
    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener categoría",
      error: error.message,
    })
  }
}

exports.createCategoria = async (req, res) => {
  try {
    const { rango, descripcion } = req.body

    if (!rango) {
      return res.status(400).json({
        success: false,
        message: "El rango de edad es requerido",
      })
    }

    const result = await pool.query("INSERT INTO categorias_edad (rango, descripcion) VALUES ($1, $2) RETURNING *", [
      rango,
      descripcion || null,
    ])

    res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      data: result.rows[0],
    })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Esta categoría de edad ya existe",
      })
    }
    res.status(500).json({
      success: false,
      message: "Error al crear categoría",
      error: error.message,
    })
  }
}

exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const { rango, descripcion } = req.body

    const result = await pool.query(
      "UPDATE categorias_edad SET rango = $1, descripcion = $2 WHERE id = $3 RETURNING *",
      [rango, descripcion || null, id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Categoría actualizada exitosamente",
      data: result.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar categoría",
      error: error.message,
    })
  }
}

exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      "DELETE FROM categorias_edad WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Categoría eliminada exitosamente",
      data: result.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar categoría",
      error: error.message,
    })
  }
}


// ===== DIFICULTADES =====

exports.getAllDificultades = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dificultades ORDER BY id ASC")
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener dificultades",
      error: error.message,
    })
  }
}

exports.createDificultad = async (req, res) => {
  try {
    const { nivel, descripcion } = req.body

    if (!nivel) {
      return res.status(400).json({
        success: false,
        message: "El nivel de dificultad es requerido",
      })
    }

    const result = await pool.query("INSERT INTO dificultades (nivel, descripcion) VALUES ($1, $2) RETURNING *", [
      nivel,
      descripcion || null,
    ])

    res.status(201).json({
      success: true,
      message: "Dificultad creada exitosamente",
      data: result.rows[0],
    })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Este nivel de dificultad ya existe",
      })
    }
    res.status(500).json({
      success: false,
      message: "Error al crear dificultad",
      error: error.message,
    })
  }
}

// ===== ÁREAS =====

exports.getAllAreas = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT a.*, COUNT(s.id) as cantidad_subareas FROM areas a LEFT JOIN subareas s ON a.id = s.area_id GROUP BY a.id ORDER BY a.nombre ASC",
    )
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener áreas",
      error: error.message,
    })
  }
}

exports.getAreaById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query("SELECT * FROM areas WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Área no encontrada",
      })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener área",
      error: error.message,
    })
  }
}

exports.createArea = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body

    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: "El nombre del área es requerido",
      })
    }

    const result = await pool.query("INSERT INTO areas (nombre, descripcion) VALUES ($1, $2) RETURNING *", [
      nombre,
      descripcion || null,
    ])

    res.status(201).json({
      success: true,
      message: "Área creada exitosamente",
      data: result.rows[0],
    })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Esta área ya existe",
      })
    }
    res.status(500).json({
      success: false,
      message: "Error al crear área",
      error: error.message,
    })
  }
}

// ===== SUBAREAS =====

exports.getAllSubareas = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT s.*, a.nombre as area_nombre FROM subareas s JOIN areas a ON s.area_id = a.id ORDER BY a.nombre, s.nombre ASC",
    )
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener subareas",
      error: error.message,
    })
  }
}

exports.getSubareasByArea = async (req, res) => {
  try {
    const { area_id } = req.params
    const result = await pool.query("SELECT * FROM subareas WHERE area_id = $1 ORDER BY nombre ASC", [area_id])
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener subareas",
      error: error.message,
    })
  }
}

exports.createSubarea = async (req, res) => {
  try {
    const { nombre, explicacion, area_id } = req.body

    if (!nombre || !explicacion || !area_id) {
      return res.status(400).json({
        success: false,
        message: "Nombre, explicación y area_id son requeridos",
      })
    }

    // Verificar que el área existe
    const areaCheck = await pool.query("SELECT id FROM areas WHERE id = $1", [area_id])

    if (areaCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El área especificada no existe",
      })
    }

    const result = await pool.query(
      "INSERT INTO subareas (nombre, explicacion, area_id) VALUES ($1, $2, $3) RETURNING *",
      [nombre, explicacion, area_id],
    )

    res.status(201).json({
      success: true,
      message: "Subárea creada exitosamente",
      data: result.rows[0],
    })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Esta subárea ya existe en esta área",
      })
    }
    res.status(500).json({
      success: false,
      message: "Error al crear subárea",
      error: error.message,
    })
  }
}

exports.updateSubarea = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, explicacion } = req.body

    const result = await pool.query("UPDATE subareas SET nombre = $1, explicacion = $2 WHERE id = $3 RETURNING *", [
      nombre,
      explicacion,
      id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subárea no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Subárea actualizada exitosamente",
      data: result.rows[0],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar subárea",
      error: error.message,
    })
  }
}

exports.deleteSubarea = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query("DELETE FROM subareas WHERE id = $1 RETURNING *", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subárea no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Subárea eliminada exitosamente",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar subárea",
      error: error.message,
    })
  }
}
