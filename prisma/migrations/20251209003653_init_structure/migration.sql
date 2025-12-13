-- CreateTable
CREATE TABLE "categorias_edad" (
    "id" SERIAL NOT NULL,
    "rango" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_edad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dificultades" (
    "id" SERIAL NOT NULL,
    "nivel" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dificultades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subareas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "explicacion" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "area_id" INTEGER NOT NULL,

    CONSTRAINT "subareas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_edad_rango_key" ON "categorias_edad"("rango");

-- CreateIndex
CREATE UNIQUE INDEX "dificultades_nivel_key" ON "dificultades"("nivel");

-- CreateIndex
CREATE UNIQUE INDEX "areas_nombre_key" ON "areas"("nombre");

-- CreateIndex
CREATE INDEX "subareas_area_id_idx" ON "subareas"("area_id");

-- CreateIndex
CREATE UNIQUE INDEX "subareas_nombre_area_id_key" ON "subareas"("nombre", "area_id");

-- AddForeignKey
ALTER TABLE "subareas" ADD CONSTRAINT "subareas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
