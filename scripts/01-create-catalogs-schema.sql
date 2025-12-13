-- Crear tabla de categorías por edad
CREATE TABLE IF NOT EXISTS categorias_edad (
  id SERIAL PRIMARY KEY,
  rango VARCHAR(50) UNIQUE NOT NULL,
  descripcion TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de dificultades
CREATE TABLE IF NOT EXISTS dificultades (
  id SERIAL PRIMARY KEY,
  nivel VARCHAR(50) UNIQUE NOT NULL,
  descripcion TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de áreas
CREATE TABLE IF NOT EXISTS areas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de subareas
CREATE TABLE IF NOT EXISTS subareas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  explicacion TEXT NOT NULL,
  area_id INTEGER NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE,
  UNIQUE(nombre, area_id)
);

-- Insertar categorías por edad por defecto
INSERT INTO categorias_edad (rango, descripcion) VALUES
('6-8 años', 'Educación primaria inicial'),
('9-11 años', 'Educación primaria media'),
('12-14 años', 'Educación secundaria inicial'),
('15-17 años', 'Educación secundaria media'),
('18+ años', 'Educación superior')
ON CONFLICT DO NOTHING;

-- Insertar dificultades por defecto
INSERT INTO dificultades (nivel, descripcion) VALUES
('fácil', 'Pregunta básica, conceptos fundamentales'),
('medio', 'Pregunta con complejidad moderada'),
('difícil', 'Pregunta avanzada, requiere análisis profundo')
ON CONFLICT DO NOTHING;

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_subareas_area_id ON subareas(area_id);