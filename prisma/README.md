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

[Getting started](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma#accessing-your-database-with-prisma-client)
The standard Prisma workflow is managed through the command-line interface (CLI).
