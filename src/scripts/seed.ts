import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
    // Especies
    await prisma.especie.createMany({
    data: [{ name: "Perro" }, { name: "Gato" }],
  });

  
}

main()
  .then(() => {
    console.log("Database populated successfully");
  })
  .catch((error) => {
    console.error("Error populating database:", error);
    process.exit(1);
  });