# Prisma ORM Setup Guide

This guide will help you set up and use Prisma ORM with PostgreSQL in the ZIGZAG project.

## Prerequisites

- Node.js >= 18.18.0
- PostgreSQL database instance
- Database connection URL

## Installation

All required dependencies have been installed:
- `@prisma/client` - Prisma Client for database queries
- `prisma` - Prisma CLI for migrations and schema management
- `@prisma/adapter-pg` - PostgreSQL adapter for Prisma
- `pg` - PostgreSQL client for Node.js
- `dotenv` - Environment variable management

## Configuration

1. **Create your .env file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the DATABASE_URL in .env:**
   ```
   DATABASE_URL="postgresql://username:password@host:port/database_name"
   PRISMA_ORM_KEY="your-prisma-key-here"
   ```

## Database Schema

The schema is defined in `prisma/schema.prisma` with the following models:

### User Model
- `id` - Auto-incrementing integer primary key
- `email` - Unique string for user email
- `name` - Optional string for user name
- `posts` - Relation to Post model

### Post Model
- `id` - Auto-incrementing integer primary key
- `title` - String for post title
- `content` - Optional string for post content
- `published` - Boolean (default: false) for publication status
- `author` - Relation to User model
- `authorId` - Foreign key to User

## Usage

### 1. Generate Prisma Client

Generate the Prisma Client from your schema:
```bash
npm run prisma:generate
```

### 2. Create and Run Migrations

Create a new migration and apply it to your database:
```bash
npm run prisma:migrate
```

When prompted, provide a name for your migration (e.g., "init").

### 3. Run Example Query

The `index.js` file contains an example query that upserts a user:
```bash
npm run db:query
```

This will create or update a user named "Alice" with the email "alice@prisma.io". Using `upsert` instead of `create` allows the script to be run multiple times without unique constraint errors.

### 4. Prisma Studio (Optional)

Open Prisma Studio to view and edit your data in the browser:
```bash
npm run prisma:studio
```

## Available Scripts

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run db:query` - Run the example query in index.js

## Example Usage

```javascript
require('dotenv/config');
const { PrismaClient } = require("./generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Create or update a user using upsert to avoid duplicate errors
const user = await prisma.user.upsert({
  where: {
    email: 'alice@prisma.io',
  },
  create: {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
  update: {},
})

// Find all users
const users = await prisma.user.findMany({
  include: {
    posts: true,
  },
})

// Create a post for a user
const post = await prisma.post.create({
  data: {
    title: 'My first post',
    content: 'This is my first post!',
    authorId: user.id,
  },
})
```

## Troubleshooting

### Connection Issues
- Ensure your PostgreSQL server is running
- Verify the DATABASE_URL is correct
- Check that the database exists
- Confirm network connectivity to the database

### Migration Issues
- If migrations fail, check the database user has proper permissions
- Ensure the database is accessible from your environment
- Review the migration error messages for specific issues

### Generated Client Issues
- Run `npm run prisma:generate` after any schema changes
- Delete the `generated` folder and regenerate if you encounter issues

## Learn More

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
