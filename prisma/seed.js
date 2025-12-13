// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando poblado de datos (Seeding)...');

  // --- 1. Crear Dificultades ---
  const dificultades = [
    { nivel: 'Fácil', descripcion: 'Preguntas básicas para principiantes' },
    { nivel: 'Medio', descripcion: 'Requiere conocimientos intermedios' },
    { nivel: 'Difícil', descripcion: 'Preguntas complejas y de análisis' },
  ];

  for (const dif of dificultades) {
    const d = await prisma.dificultad.upsert({
      where: { nivel: dif.nivel },
      update: {},
      create: dif,
    });
    console.log(`✅ Dificultad asegurada: ${d.nivel}`);
  }

  // --- 2. Crear Categorías por Edad ---
  const categorias = [
    { rango: '6-8 años', descripcion: 'Educación primaria inicial' },
    { rango: '9-12 años', descripcion: 'Educación primaria superior' },
    { rango: '13-15 años', descripcion: 'Educación secundaria inicial' },
    { rango: '16-18 años', descripcion: 'Bachillerato / Pre-universitario' },
    { rango: 'Universitario', descripcion: 'Educación superior' },
  ];

  for (const cat of categorias) {
    const c = await prisma.categoriaEdad.upsert({
      where: { rango: cat.rango },
      update: {},
      create: cat,
    });
    console.log(`✅ Categoría asegurada: ${c.rango}`);
  }

  // --- 3. Crear Áreas y Subáreas (Ejemplo) ---
  const areasData = [
    {
      nombre: 'Matemáticas',
      descripcion: 'Ciencias exactas y lógica',
      subareas: [
        { nombre: 'Álgebra', explicacion: 'Ecuaciones y variables' },
        { nombre: 'Geometría', explicacion: 'Formas y espacios' }
      ]
    }
  ];

  for (const area of areasData) {
    const a = await prisma.area.upsert({
      where: { nombre: area.nombre },
      update: {},
      create: {
        nombre: area.nombre,
        descripcion: area.descripcion,
        subareas: {
          create: area.subareas
        }
      },
    });
    console.log(`✅ Área creada: ${a.nombre}`);
  }

  console.log('🏁 Base de datos poblada correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });