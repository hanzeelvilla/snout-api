# Snout API

Official API for [Snout](https://github.com/hanzeelvilla/snout) — The app to help you care for your friend 🐶

## Requirements

- [Node.js](https://nodejs.org/es) 18.x or higher
- npm
- [MySQL](https://www.mysql.com/) (or compatible DB)
- VS Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension(Optional)

## Installation

### Clone the repository

```bash
git clone https://github.com/hanzeelvilla/snout-api.git
cd snout-api
```

### Install the dependencies

```bash
npm install
```

1. Open and edit `.env.example` with your settings. Then rename it to `.env`

2. Run Prisma migrations and generate the client

```bash
npx prisma migrate dev
npx prisma generate
```

### Start the server

```bash
# development
npm run dev
```

```bash
# production
npm run build
npm run start
```

## Scripts

- `npm run dev` — start development server with hot-reload
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run seed` — populate DB with sample data
- `npm run clear` — truncate/clear tables

## Endpoints

### Auth

- POST /api/auth/sign-up — register (name, lastName, email, username, password, confirmPassword)
- POST /api/auth/login — login (username, password) → returns JWT

### Pets

- GET /api/mascotas — list authenticated user's pets (requires Authorization header)
- GET /api/mascotas/:id — get pet by id (only owner)
- POST /api/mascotas — create pet (name, birthDate YYYY-MM-DD, avatarId)
- PUT /api/mascotas/:id — update pet (only owner)
- DELETE /api/mascotas/:id — delete pet (only owner)

### Avatars

- GET /api/avatares — list avatars (ordered alphabetically by species then race)  
  Optional query: `?especie=Perro` or `?especie=Gato` (case-insensitive)

All endpoints that require authentication must include:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## Testing with REST Client

See `testEndpoints.rest` for ready-to-use requests (VS Code REST Client).
