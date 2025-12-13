# GUÍA DE INSTALACIÓN Y DESPLIEGUE - CUESTIONARIO  (BACKEND)

Este documento detalla los pasos necesarios para clonar, configurar y 
ejecutar el backend del sistema, incluyendo la configuración de seguridad
(HTTPS/HTTP2) y la base de datos PostgreSQL.

## REQUISITOS PREVIOS:
1. Node.js (v18 o superior)
2. PostgreSQL (v14 o superior) instalado y corriendo.
3. Git

 ## PASO 1: CLONAR EL REPOSITORIO E INSTALAR DEPENDENCIAS
1. Abra una terminal en la carpeta donde desea descargar el proyecto.
2. Ejecute:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO_AQUI>
   cd cuestionario
   ```

4. Instale las librerías necesarias:
   ```bash
   npm install
   ```
 ## PASO 2: CONFIGURACIÓN DE VARIABLES DE ENTORNO (.env)

IMPORTANTE: Por seguridad, las credenciales no se incluyen en el repositorio.
Debe crear un archivo llamado ".env" en la raíz del proyecto.

1. Cree un archivo nuevo llamado `.env` en la carpeta raíz.
2. Copie y pegue el siguiente contenido, reemplazando con sus credenciales:
   ```bash
   PORT=3001
   ```
   # Conexión a Base de Datos (Prisma y PG)
   Formato:
   ```bash
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
   ```
   ```bash
   DATABASE_URL="postgresql://postgres:SU_CONTRASEÑA@localhost:5432/cuestionario?schema=public"
   ```
   ## Secreto para firmar los Tokens (JWT)
   ```bash
   JWT_SECRET="escriba_aqui_una_frase_secreta_y_larga"
   ```
3. Para mas detalle
   - Abrir postgres y crear una base de datos (mejor si coloca como nombre cuestionario)
   - DATABASE -> sera el nombre de la base de datos
   - PASSWORD -> la contraseña utilizada para esa base de datos
   - PORT -> el puerto que esta utilizando

## PASO 3: GENERACIÓN DE CERTIFICADOS SSL (HTTPS / HTTP2)

Para habilitar HTTP/2, el servidor requiere certificados SSL. Como es un 
entorno de desarrollo local, generaremos certificados auto-firmados.

1. Ejecute el siguiente script incluido en el proyecto:
   ```bash
   npm run cert
   ```
> (Nota: Esto ejecutará 'node generar_cert.js' y creará los archivos 
   'server.key' y 'server.cert' en la raíz automáticamente).

 ## PASO 4: BASE DE DATOS Y POBLADO DE DATOS (SEED)

Sincronizaremos la estructura de la base de datos y cargaremos datos de 
prueba (Categorías, Dificultades, Usuario Admin inicial).

1. Ejecute las migraciones para crear las tablas:
   ```bash
   npx prisma migrate dev --name init
   ```
2. Ejecute el siguiente comando:
    ```bash
    npx prisma generate
    ``` 
3. Ejecute el script de poblado (Seed) para insertar datos iniciales:
   ```bash
   npx prisma db seed
   ```
  * Esto creará categorías (6-8 años, etc.) y dificultades por defecto.
  * NO crea usuarios automáticamente por seguridad. Debe registrarse vía API.

## PASO 5: EJECUTAR EL SERVIDOR

1. Inicie el servidor:
   ```bash
   node src/app.js
    ```
   o
   ```bash
   npm start
   ```
   Debería ver el mensaje: 
   "🔒 Servidor HTTP/2 corriendo en https://localhost:3001"

# PRUEBAS DE ACCESO

El servidor utiliza HTTPS y certificados auto-firmados. Al realizar las peticiones:
1. Asegúrese de usar "https://" en todas las URLs.
2. En Postman, desactive la verificación SSL (Settings -> SSL certificate verification -> OFF).

## A. AUTENTICACIÓN (Obtener Token)

Para acceder a los recursos, primero debe registrarse e iniciar sesión.

1. REGISTRO DE USUARIO (ADMIN)
   - Método: POST
   - URL: https://localhost:3001/api/auth/register
   - Body (JSON):
      ```json
      {
      "nombre": "Jorge Aranibar",
      "email": "aranibar@gmail.com",
      "password": "Prueb@123",
      "rol": "ADMIN"
      }
      ```

2. INICIO DE SESIÓN (LOGIN)
   - Método: POST
   - URL: https://localhost:3001/api/auth/login
   - Body (JSON):
     ```json
       {
         "email": "aranibar@gmail.com",
         "password": "Prueb@123"
       }
     ```
   
   > IMPORTANTE: La respuesta le devolverá un "token". Copie este código
   largo (sin comillas) para usarlo en los siguientes pasos.

## B. GESTIÓN DE CATEGORÍAS (CRUD Protegido)

Para estas peticiones, debe configurar la autorización en Postman:
- Pestaña "Authorization" -> Tipo: "Bearer Token" -> Pegar el Token.

3. CREAR CATEGORÍA (POST)
   - Método: POST
   - URL: https://localhost:3001/api/categorias
   - Body (JSON):
     ```json
     {
       "rango": "18-25 años",
       "descripcion": "Jóvenes universitarios"
     }
     ```
4. LISTAR CATEGORÍAS (GET)
   - Método: GET
   - URL: https://localhost:3001/api/categorias
   - Resultado: Debería ver la lista incluyendo la creada anteriormente.
     (Note el "id" de la categoría para usarlo en PUT y DELETE).

5. ACTUALIZAR CATEGORÍA (PUT)
   - Método: PUT
   - URL: https://localhost:3001/api/categorias/1
     *(Reemplace el '1' por el ID real si es diferente)*
   - Body (JSON):
     ```json
     {
       "rango": "18-25 años",
       "descripcion": "Jóvenes universitarios y primeros empleos"
     }
     ```
6. ELIMINAR CATEGORÍA (DELETE)
   - Método: DELETE
   - URL: https://localhost:3001/api/categorias/1
     *(Reemplace el '1' por el ID real que desea eliminar)*
   - Nota: Solo usuarios con rol ADMIN pueden realizar esta acción.
