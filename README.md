# Snout API

API oficial de la mejor aplicación para cuidar a tu amigo peludo 🐶
[Snout](https://github.com/hanzeelvilla/snout)

## Requisitos

- [Node.js](https://nodejs.org/en) (versión 18.x o superior)
- [npm](https://www.npmjs.com/)
- Extensión de VS Code [REST CLIENT](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (opcional)
- [MySQL](https://www.mysql.com/) o algún otro manejador de bases de datos

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona el respositorio

```bash
https://github.com/hanzeelvilla/snout-api.git
```

2. Navega al directorio del proyecto:

```bash
cd snout-api
```

3. Instala las dependencias:

```bash
npm install
```

4. Crea la base de datos si no existe

```sql
CREATE DATABASE snout;
```

5. Crea un archivo `.env`

```text
DATABASE_URL="mysql://user:pswd@localhost:3306/snout"
PORT=3000
JWT_SECRET="CHIVAS>PUMAS"
```

> [!WARNING]
> Recuerda cambiar tu username, pswd secret token y alguna otra configuración necesaria

6. Aplica las migraciones de Prisma para crear las tablas automáticamente:

```bash
npx prisma migrate dev
```

Esto leerá tu archivo [`prisma/schema.prisma`](prisma/schema.prisma) y aplicará las migraciones necesarias en la base de datos.

> [!NOTE] Si es la primera vez que usas Prisma en el proyecto, también puedes generar el cliente Prisma con:
>
> ```bash
> npx prisma generate
> ```

7. Inicia el servidor:

```bash
npm run build
npm run start
```

## SCRIPTS

Estos son los scripts útiles que puedes ejecutar en este proyecto:

- **Levantar el servidor en modo desarrollo:**

  ```bash
  npm run dev
  ```

- **Construir el proyecto (TypeScript a JavaScript):**

  ```bash
  npm run build
  ```

- **Iniciar el servidor en producción:**

  ```bash
  npm run start
  ```

- **Popular la base de datos con datos de ejemplo:**

  ```bash
  npm run seed
  ```

- **Limpiar todas las tablas de la base de datos:**
  ```bash
  npm run clear
  ```

> Puedes modificar o agregar más scripts en la sección `"scripts"` de tu archivo `package.json`.

## ENDPOINTS

Endpoints principales de la API:

### Autenticación

- **Registro de usuario**

  ```
  POST /api/auth/sign-up
  ```

  Crea un nuevo usuario. Requiere: `name`, `lastName`, `email`, `username`, `password`, `confirmPassword`.

- **Login**
  ```
  POST /api/auth/login
  ```
  Inicia sesión y devuelve un JWT. Requiere: `username`, `password`.

---

### Mascotas

- **Obtener todas las mascotas del usuario autenticado**

  ```
  GET /api/mascotas
  ```

  Requiere autenticación (JWT en header `Authorization`).

- **Obtener una mascota por ID (solo si es tuya)**

  ```
  GET /api/mascotas/:id
  ```

  Requiere autenticación.

- **Crear una nueva mascota**

  ```
  POST /api/mascotas
  ```

  Requiere autenticación. Campos: `name`, `birthDate` (YYYY-MM-DD), `avatarId`.

- **Actualizar una mascota (solo si es tuya)**

  ```
  PUT /api/mascotas/:id
  ```

  Requiere autenticación. Solo el dueño puede actualizar.

- **Eliminar una mascota (solo si es tuya)**
  ```
  DELETE /api/mascotas/:id
  ```
  Requiere autenticación. Solo el dueño puede eliminar.

---

> Todos los endpoints que requieren autenticación deben incluir el header:
>
> ```
> Authorization: Bearer TU_JWT_TOKEN
> ```

Consulta el archivo `testEndpoints.rest` para ejemplos de uso con la extensión REST Client.

## PROBAR LOS ENDPOINTS

Si tienes la extensión [REST CLIENT](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de VS Code, puedes probar los endpoints con dando clic en cada petición.
