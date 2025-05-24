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
DATABASE_URL="mysql://user:pswd$@localhost:3306/snout"
```

> [!WARNING]
> Recuerda cambiar tu username, pswd y alguna otra configuración necesaria

6. Aplica las migraciones de Prisma para crear las tablas automáticamente:

```bash
npx prisma migrate deploy
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
