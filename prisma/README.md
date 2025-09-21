# PRISMA

[Prisma](https://www.prisma.io/) is an **Object-Relational Mapper** (ORM) that helps developers build applications faster and with fewer errors. **Instead of writing raw SQL**, Prisma allows you to interact with your database using a declarative data schema and a type-safe database client.

## Prisma Core Components

Prisma consists of three main tools that work together:

1. **Prisma Client:** A type-safe, auto-generated database client. It lets you send queries to your database from your code (e.g., JavaScript, TypeScript, Go). Queries are written in an intuitive way and provide auto-completion in your code editor.
2. **Prisma Migrate:** A database migration system that allows you to safely and consistently evolve your database schema. Migrations are based on your schema.prisma file and are saved as a version-controlled history in your project.
3. **Prisma Studio:** A user-friendly graphical user interface (GUI) for viewing and editing the data in your database. It's a great tool for inspecting and managing your data during development.

## The schema.prisma file

The heart of any Prisma project is the `schema.prisma` file. This is where you define your data models, database connection, and client generators.

## Basic structure

```javascript
// datasource: defines the connection to your database
datasource db {
  provider = "postgresql" // You can also use "mysql", "sqlite", "sqlserver", "mongodb", etc.
  url      = env("DATABASE_URL")
}

// generator: defines which database client will be generated
generator client {
  provider = "prisma-client-js"
}

// model: defines a table or collection in your database
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

## The Prisma workflow

[Getting started](https://www.prisma.io/docs/getting-started/quickstart-sqlite)
The standard Prisma workflow is managed through the command-line interface (CLI).

### 1. Installation and setup

Install the dependencies for TypeScript and Prisma

```bash
npm install -D typescript tsx @types/node prisma
```

Initialize your TypeScript project. This creates a `tsconfig.json` file.

```bash
npx tsc --init
```

Initialize Prisma, which creates your `schema.prisma` file, sets up your `.env` and install `@prisma/client`.

```bash
npx prisma init
```

### 2. Model your data in the Prisma schema

The heart of any Prisma project is the `schema.prisma file`. This is where you define your data **models, database connection, and the client generators**. This file is created for you when you run `npx prisma init`.

Here's how your `schema.prisma` file should look for a MySQL database:

```typescript
// datasource: defines the connection to your MySQL database
datasource db {
  provider = "mysql" 
  url      = env("DATABASE_URL")
}

// generator: defines which database client will be generated
generator client {
  provider = "prisma-client-js"
}

// model: defines a table in your database
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

Make sure your `.env` file contains the correct MySQL connection string, such as:

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
```

> [!NOTE]
> The default PORT for MySQL is 3306.

#### Supported Databases

- PostgreSQL
- MySQL
- SQLite
- SQL Server
- CockroachDB
- MariaDB
- MongoDB

To change your database provider, follow these two steps:

1. Modify the `schema.prisma` File. In your `schema.prisma file`, locate the `datasource` block and change the `provider` field to the database you want to use.
2. Update the `DATABASE_URL` in your `.env` File.

### 3. Migrations

Prisma Migrate lets you create and apply changes to your database schema.
This is the primary command for development. It compares your `schema.prisma` with the current state of your database, generates the necessary migration files, and applies them.

```bash
npx prisma migrate dev --name <migration_name>
```
