import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  /* -------------------------------- Especies -------------------------------- */
  await prisma.especie.createMany({
    data: [{ name: "Perro" }, { name: "Gato" }],
  });

  /* ---------------------------------- Razas --------------------------------- */
  const perro = await prisma.especie.findUnique({
    where: { name: "Perro" },
  });
  const gato = await prisma.especie.findUnique({
    where: { name: "Gato" },
  });

  if (!perro || !gato) {
    throw new Error("Required species not found in the database.");
  }

  await prisma.raza.createMany({
    data: [
      { name: "Beagle", especieId: perro.id },
      { name: "Husky", especieId: perro.id },
    ],
  });

  /* -------------------------------- Avatares -------------------------------- */
  const husky = await prisma.raza.findUnique({
    where: { name: "Husky" },
  });

  const beagle = await prisma.raza.findUnique({
    where: { name: "Beagle" },
  });

  if (!husky || !beagle) {
    throw new Error("Required breed not found in the database.");
  }

  await prisma.avatar.createMany({
    data: [
      { color: "Gris", razaId: husky.id },
      { color: "Café", razaId: husky.id },
      { color: "Café", razaId: beagle.id },
    ],
  });

  /* -------------------------------- Mascotas -------------------------------- */
  const walle = await prisma.user.findUnique({
    where: { username: "walle" },
  });

  const beagleAvatar = await prisma.avatar.findUnique({
    where: { razaId_color: { razaId: beagle.id, color: "Café" } },
  });

  if (!walle || !beagleAvatar) {
    throw new Error("Required user or avatar not found in the database.");
  }

  await prisma.mascota.create({
    data: {
      name: "Viejon",
      birthDate: new Date("2015-27-02"),
      avatarId: beagleAvatar.id,
      userId: walle.id,
    },
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
