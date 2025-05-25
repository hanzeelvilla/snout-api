import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  // Especies
  await prisma.especie.createMany({
    data: [{ name: "Perro" }, { name: "Gato" }],
  });

  const perro = await prisma.especie.findUnique({
    where: { name: "Perro" },
  });
  const gato = await prisma.especie.findUnique({
    where: { name: "Gato" },
  });

  if (!perro || !gato) {
    throw new Error("Required species not found in the database.");
  }

  // Razas
  await prisma.raza.createMany({
    data: [
      { name: "Beagle", especieId: perro.id },
      { name: "Husky", especieId: perro.id },
    ],
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
