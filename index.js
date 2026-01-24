// index.js
// Query your database using the Prisma Client

require('dotenv/config');
const { PrismaClient } = require("./generated/prisma/client.js");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Example query to create a user based on the example schema

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: 'alice@prisma.io',
    },
    create: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
    update: {
      // No-op update to keep the example rerunnable without changing existing data
    },
  })

  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
