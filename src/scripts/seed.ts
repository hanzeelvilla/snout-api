import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

async function main() {
  // Especies
  const especies = [{ name: "Perro" }, { name: "Gato" }];
  await prisma.especie.createMany({ data: especies, skipDuplicates: true });

  // Razas
  const especiesDb = await prisma.especie.findMany();
  const especieMap = Object.fromEntries(especiesDb.map((e) => [e.name, e.id]));
  const razas = [
    { name: "Beagle", especieId: especieMap["Perro"] },
    { name: "Border-Collie", especieId: especieMap["Perro"] },
    { name: "Boxer", especieId: especieMap["Perro"] },
    { name: "Bulldog", especieId: especieMap["Perro"] },
    { name: "Chihuahua", especieId: especieMap["Perro"] },
    { name: "Cocker-Spaniel", especieId: especieMap["Perro"] },
    { name: "Doberman", especieId: especieMap["Perro"] },
    { name: "French-Bulldog", especieId: especieMap["Perro"] },
    { name: "Golden-Retriever", especieId: especieMap["Perro"] },
    { name: "Husky", especieId: especieMap["Perro"] },
    { name: "Labrador-Retriever", especieId: especieMap["Perro"] },
    { name: "Pastor-Aleman", especieId: especieMap["Perro"] },
    { name: "Pitbull", especieId: especieMap["Perro"] },
    { name: "Pug", especieId: especieMap["Perro"] },
    { name: "Rottweiler", especieId: especieMap["Perro"] },
    { name: "Salchicha", especieId: especieMap["Perro"] },
    { name: "Shih-Tzu", especieId: especieMap["Perro"] },
    { name: "Abisinio", especieId: especieMap["Gato"] },
    { name: "Azul-ruso", especieId: especieMap["Gato"] },
    { name: "Bombay", especieId: especieMap["Gato"] },
    { name: "Bosque-Noruega", especieId: especieMap["Gato"] },
    { name: "British-Shorthair", especieId: especieMap["Gato"] },
    { name: "Devon-Rex", especieId: especieMap["Gato"] },
    { name: "Esfinge", especieId: especieMap["Gato"] },
    { name: "Pardo", especieId: especieMap["Gato"] },
    { name: "Maine-coon", especieId: especieMap["Gato"] },
    { name: "Persa", especieId: especieMap["Gato"] },
    { name: "Ragdoll", especieId: especieMap["Gato"] },
    { name: "Siamés", especieId: especieMap["Gato"] },
  ];
  await prisma.raza.createMany({ data: razas, skipDuplicates: true });

  // Avatares
  const razasDb = await prisma.raza.findMany();
  const razaMap = Object.fromEntries(razasDb.map((r) => [r.name, r.id]));
  const avatares = [
    { color: "Negro", razaId: razaMap["Border-Collie"] },
    { color: "Café", razaId: razaMap["Border-Collie"] },
    { color: "Gris", razaId: razaMap["Husky"] },
    { color: "Café", razaId: razaMap["Husky"] },
    { color: "Café", razaId: razaMap["Pitbull"] },
    { color: "Gris", razaId: razaMap["Pitbull"] },
    { color: "Café", razaId: razaMap["Beagle"] },
    { color: "Café", razaId: razaMap["Boxer"] },
    { color: "Café", razaId: razaMap["Bulldog"] },
    { color: "Café", razaId: razaMap["Chihuahua"] },
    { color: "Café", razaId: razaMap["Cocker-Spaniel"] },
    { color: "Negro", razaId: razaMap["Doberman"] },
    { color: "Blanco", razaId: razaMap["French-Bulldog"] },
    { color: "Dorado", razaId: razaMap["Golden-Retriever"] },
    { color: "Blanco", razaId: razaMap["Labrador-Retriever"] },
    { color: "Café", razaId: razaMap["Pastor-Aleman"] },
    { color: "Café", razaId: razaMap["Pug"] },
    { color: "Negro", razaId: razaMap["Rottweiler"] },
    { color: "Café", razaId: razaMap["Salchicha"] },
    { color: "Blanco", razaId: razaMap["Shih-Tzu"] },
    { color: "Café", razaId: razaMap["Abisinio"] },
    { color: "Azúl", razaId: razaMap["Azul-ruso"] },
    { color: "Negro", razaId: razaMap["Bombay"] },
    { color: "Gris", razaId: razaMap["Bosque-Noruega"] },
    { color: "Gris", razaId: razaMap["British-Shorthair"] },
    { color: "Café", razaId: razaMap["Devon-Rex"] },
    { color: "Rosa", razaId: razaMap["Esfinge"] },
    { color: "Café", razaId: razaMap["Pardo"] },
    { color: "Naranja", razaId: razaMap["Pardo"] },
    { color: "Gris", razaId: razaMap["Pardo"] },
    { color: "Café", razaId: razaMap["Maine-coon"] },
    { color: "Blanco", razaId: razaMap["Persa"] },
    { color: "Blanco", razaId: razaMap["Ragdoll"] },
    { color: "Café", razaId: razaMap["Siamés"] },
  ];
  await prisma.avatar.createMany({ data: avatares, skipDuplicates: true });
}

main()
  .then(() => {
    console.log("Database populated successfully");
  })
  .catch((error) => {
    console.error("Error populating database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
