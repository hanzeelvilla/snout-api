import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  
  await prisma.mascota.deleteMany();
  await prisma.avatar.deleteMany();
  await prisma.raza.deleteMany();
  await prisma.especie.deleteMany();
  await prisma.user.deleteMany();
  
  console.log("All data deleted");
}

main()
  .catch((error) => {
    console.error("Error", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });