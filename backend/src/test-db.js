const prisma = require('./config/prisma');

async function main() {
  const users = await prisma.users.findMany();

  console.log(users);
}

main();