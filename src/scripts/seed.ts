import { PrismaClient } from "@prisma/client";
import { url } from "inspector";
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
    {
      color: "Negro",
      razaId: razaMap["Border-Collie"],
      url: "https://drive.google.com/file/d/1DJdV5x0RgfNkAyrRnGTmktNVNeh7gYUT/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Border-Collie"],
      url: "https://drive.google.com/file/d/1vAXQY0Xwy9XRnObNdWJ8wgKMIA7zqqPc/view?usp=drive_link",
    },
    {
      color: "Gris",
      razaId: razaMap["Husky"],
      url: "https://drive.google.com/file/d/1qv_qefEZ6UuQo3BdR7hOlUk3PTfz2OwM/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Husky"],
      url: "https://drive.google.com/file/d/1kF3cTCDAq04Lt1rz7tmFLaINpZUjsga1/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Pitbull"],
      url: "https://drive.google.com/file/d/1-a83pLzr6jy8w1h2kB3QHy663jCmyWFr/view?usp=drive_link",
    },
    {
      color: "Gris",
      razaId: razaMap["Pitbull"],
      url: "https://drive.google.com/file/d/14x7_MLRSZkvC-tojaugr3iGjhH4OrV83/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Beagle"],
      url: "https://drive.google.com/file/d/1APcCe-jZ1mOpNnOQGlwOOYmsYfEZubmE/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Boxer"],
      url: "https://drive.google.com/file/d/1oUYVF-8OrYRAhNmatzs1RiUETdchSzTN/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Bulldog"],
      url: "https://drive.google.com/file/d/1bF2G4i-rU-vIog2ix95YULzLRkCnJLzU/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Chihuahua"],
      url: "https://drive.google.com/file/d/1WxlcPpFwn66ZbcIkXud3iLHUB2w4tycv/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Cocker-Spaniel"],
      url: "https://drive.google.com/file/d/1E1jV7TEMJyUouqHto1Y-Xl1pBOdyXIXc/view?usp=drive_link",
    },
    {
      color: "Negro",
      razaId: razaMap["Doberman"],
      url: "https://drive.google.com/file/d/1_RfA-C2WJBnJzpskabh8tDCHw7lYTbzo/view?usp=drive_link",
    },
    {
      color: "Blanco",
      razaId: razaMap["French-Bulldog"],
      url: "https://drive.google.com/file/d/17-XUBWfmjVfQ3d-6Ya-YQvu6Kst2gWTN/view?usp=drive_link",
    },
    {
      color: "Dorado",
      razaId: razaMap["Golden-Retriever"],
      url: "https://drive.google.com/file/d/1NZhK19zq4DKTc4nj8Dqva8fGjg8yHtcB/view?usp=drive_link",
    },
    {
      color: "Blanco",
      razaId: razaMap["Labrador-Retriever"],
      url: "https://drive.google.com/file/d/1LkgeiKJvDmvRiJ_gSznOb7uWLhj3koBL/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Pastor-Aleman"],
      url: "https://drive.google.com/file/d/1ojIuU9ZxjjA84kLwQWC-ZDDT3lgKeuyu/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Pug"],
      url: "https://drive.google.com/file/d/16hkMBzzk1GE_oDhVrizmPUhQ2wk8mUz-/view?usp=drive_link",
    },
    {
      color: "Negro",
      razaId: razaMap["Rottweiler"],
      url: "https://drive.google.com/file/d/1QvGvMbsL2ThpbukbbZKVNGTcFK46yT5Q/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Salchicha"],
      url: "https://drive.google.com/file/d/1J5-Tvcb7E5AjlEnTyM9TVl1j5xGmhF4k/view?usp=drive_link",
    },
    {
      color: "Blanco",
      razaId: razaMap["Shih-Tzu"],
      url: "https://drive.google.com/file/d/1NKTs2A0wmMUzUuLuJW9qrRvGrO6AddYy/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Abisinio"],
      url: "https://drive.google.com/file/d/1VWOQRZfZw5yNFelnfgHfg-ZGi8OMZktK/view?usp=drive_link",
    },
    {
      color: "Azúl",
      razaId: razaMap["Azul-ruso"],
      url: "https://drive.google.com/file/d/1Zf-JA6P5vW_iXmv4tceyNReTagbvDKZT/view?usp=drive_link",
    },
    {
      color: "Negro",
      razaId: razaMap["Bombay"],
      url: "https://drive.google.com/file/d/1DQ3_U23DW6ppKI3bEpTFxA6I_yFDjFPD/view?usp=drive_link",
    },
    {
      color: "Gris",
      razaId: razaMap["Bosque-Noruega"],
      url: "https://drive.google.com/file/d/1FqB_02Odn5wSVnlDeP2b-WPk-rg90mxG/view?usp=drive_link",
    },
    {
      color: "Gris",
      razaId: razaMap["British-Shorthair"],
      url: "https://drive.google.com/file/d/1KyJZT1J37xJnd6nh5sQTTSRRpgrsQPMy/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Devon-Rex"],
      url: "https://drive.google.com/file/d/1tCebLrMl3_4YQHnw52v4MdQwSN0Shb0S/view?usp=drive_link",
    },
    {
      color: "Rosa",
      razaId: razaMap["Esfinge"],
      url: "https://drive.google.com/file/d/1U-B-RjGOxHLYrRx_hPqdRhjXG_X74wh3/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Pardo"],
      url: "https://drive.google.com/file/d/1FAV3s5j13w8BEjCW1k2gCTDJx-oOcuGd/view?usp=drive_link",
    },
    {
      color: "Naranja",
      razaId: razaMap["Pardo"],
      url: "https://drive.google.com/file/d/1dF09nMePb7leqQqgv6CH_zoW9y-1wo6e/view?usp=drive_link",
    },
    {
      color: "Gris",
      razaId: razaMap["Pardo"],
      url: "https://drive.google.com/file/d/1kYGUmkLCqzX53balIjOnPEoZfYSNzZ57/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Maine-coon"],
      url: "https://drive.google.com/file/d/1y18fSmNkkmgbnrTOvjTnSXDC3RsrearN/view?usp=drive_link",
    },
    {
      color: "Blanco",
      razaId: razaMap["Persa"],
      url: "https://drive.google.com/file/d/1ksFYyiMTOwSzwYCu1FBdUpCdxDb5ws2B/view?usp=drive_link",
    },
    {
      color: "Blanco",
      razaId: razaMap["Ragdoll"],
      url: "https://drive.google.com/file/d/1cYRJ40etSAEq9AXmv-FJ67UPibHPYtzc/view?usp=drive_link",
    },
    {
      color: "Café",
      razaId: razaMap["Siamés"],
      url: "https://drive.google.com/file/d/11yXnDEeo6EK2fb99rGEGCq6o4BwHhzTx/view?usp=drive_link",
    },
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
