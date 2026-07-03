// 1. Tell Node to load the hidden .env file
require('dotenv').config(); 

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// 2. Pull the secure string from the environment
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 3. Wrap it in the adapter
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;