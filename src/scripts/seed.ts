import bcrypt from "bcrypt";
import prisma from "../prisma-client"

/* ------------------------------- INTERFACES ------------------------------- */

interface Specie {
  name: string
}

const perro: Specie = {
  name: "Perro"
}

const gato: Specie = {
  name: "Gato"
}

interface User {
  name: string,
  lastName: string,
  email: string,
  username: string,
  password: string
}

interface Reminder {
  title: string,
  description?: string,
  dueDate: Date,
  userId: string
}

async function main() {

  /* ----------------------------- INSERT SPECIES ----------------------------- */

  const species: Specie[] = [perro, gato];
  await prisma.specie.createMany({ data: species, skipDuplicates: true });

  /* ------------------------------ INSERT RACES ------------------------------ */

  const especiesDb = await prisma.specie.findMany();
  const especieMap = Object.fromEntries(especiesDb.map((e) => [e.name, e.id]));
  const races = [
    { name: "Beagle", specieId: especieMap["Perro"] },
    { name: "Border-Collie", specieId: especieMap["Perro"] },
    { name: "Boxer", specieId: especieMap["Perro"] },
    { name: "Bulldog", specieId: especieMap["Perro"] },
    { name: "Chihuahua", specieId: especieMap["Perro"] },
    { name: "Cocker-Spaniel", specieId: especieMap["Perro"] },
    { name: "Doberman", specieId: especieMap["Perro"] },
    { name: "French-Bulldog", specieId: especieMap["Perro"] },
    { name: "Golden-Retriever", specieId: especieMap["Perro"] },
    { name: "Husky", specieId: especieMap["Perro"] },
    { name: "Labrador-Retriever", specieId: especieMap["Perro"] },
    { name: "Pastor-Alemán", specieId: especieMap["Perro"] },
    { name: "Pitbull", specieId: especieMap["Perro"] },
    { name: "Pug", specieId: especieMap["Perro"] },
    { name: "Rottweiler", specieId: especieMap["Perro"] },
    { name: "Salchicha", specieId: especieMap["Perro"] },
    { name: "Shih-Tzu", specieId: especieMap["Perro"] },
    { name: "Abisinio", specieId: especieMap["Gato"] },
    { name: "Azul-ruso", specieId: especieMap["Gato"] },
    { name: "Bombay", specieId: especieMap["Gato"] },
    { name: "Bosque-Noruega", specieId: especieMap["Gato"] },
    { name: "British-Shorthair", specieId: especieMap["Gato"] },
    { name: "Devon-Rex", specieId: especieMap["Gato"] },
    { name: "Esfinge", specieId: especieMap["Gato"] },
    { name: "Pardo", specieId: especieMap["Gato"] },
    { name: "Maine-coon", specieId: especieMap["Gato"] },
    { name: "Persa", specieId: especieMap["Gato"] },
    { name: "Ragdoll", specieId: especieMap["Gato"] },
    { name: "Siamés", specieId: especieMap["Gato"] },
  ];
  await prisma.race.createMany({ data: races, skipDuplicates: true });

  /* ----------------------------- INSERT AVATARS ----------------------------- */

  const razasDb = await prisma.race.findMany();
  const razaMap = Object.fromEntries(razasDb.map((r) => [r.name, r.id]));
  const avatares = [
    {
      color: "Negro",
      raceId: razaMap["Border-Collie"],
      url: "https://drive.google.com/file/d/1DJdV5x0RgfNkAyrRnGTmktNVNeh7gYUT/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Border-Collie"],
      url: "https://drive.google.com/file/d/1vAXQY0Xwy9XRnObNdWJ8wgKMIA7zqqPc/view?usp=drive_link",
    },
    {
      color: "Gris",
      raceId: razaMap["Husky"],
      url: "https://drive.google.com/file/d/1qv_qefEZ6UuQo3BdR7hOlUk3PTfz2OwM/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Husky"],
      url: "https://drive.google.com/file/d/1kF3cTCDAq04Lt1rz7tmFLaINpZUjsga1/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Pitbull"],
      url: "https://drive.google.com/file/d/1-a83pLzr6jy8w1h2kB3QHy663jCmyWFr/view?usp=drive_link",
    },
    {
      color: "Gris",
      raceId: razaMap["Pitbull"],
      url: "https://drive.google.com/file/d/14x7_MLRSZkvC-tojaugr3iGjhH4OrV83/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Beagle"],
      url: "https://drive.google.com/file/d/1APcCe-jZ1mOpNnOQGlwOOYmsYfEZubmE/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Boxer"],
      url: "https://drive.google.com/file/d/1oUYVF-8OrYRAhNmatzs1RiUETdchSzTN/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Bulldog"],
      url: "https://drive.google.com/file/d/1bF2G4i-rU-vIog2ix95YULzLRkCnJLzU/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Chihuahua"],
      url: "https://drive.google.com/file/d/1WxlcPpFwn66ZbcIkXud3iLHUB2w4tycv/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Cocker-Spaniel"],
      url: "https://drive.google.com/file/d/1E1jV7TEMJyUouqHto1Y-Xl1pBOdyXIXc/view?usp=drive_link",
    },
    {
      color: "Negro",
      raceId: razaMap["Doberman"],
      url: "https://drive.google.com/file/d/1_RfA-C2WJBnJzpskabh8tDCHw7lYTbzo/view?usp=drive_link",
    },
    {
      color: "Blanco",
      raceId: razaMap["French-Bulldog"],
      url: "https://drive.google.com/file/d/17-XUBWfmjVfQ3d-6Ya-YQvu6Kst2gWTN/view?usp=drive_link",
    },
    {
      color: "Dorado",
      raceId: razaMap["Golden-Retriever"],
      url: "https://drive.google.com/file/d/1NZhK19zq4DKTc4nj8Dqva8fGjg8yHtcB/view?usp=drive_link",
    },
    {
      color: "Blanco",
      raceId: razaMap["Labrador-Retriever"],
      url: "https://drive.google.com/file/d/1LkgeiKJvDmvRiJ_gSznOb7uWLhj3koBL/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Pastor-Alemán"],
      url: "https://drive.google.com/file/d/1ojIuU9ZxjjA84kLwQWC-ZDDT3lgKeuyu/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Pug"],
      url: "https://drive.google.com/file/d/16hkMBzzk1GE_oDhVrizmPUhQ2wk8mUz-/view?usp=drive_link",
    },
    {
      color: "Negro",
      raceId: razaMap["Rottweiler"],
      url: "https://drive.google.com/file/d/1QvGvMbsL2ThpbukbbZKVNGTcFK46yT5Q/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Salchicha"],
      url: "https://drive.google.com/file/d/1J5-Tvcb7E5AjlEnTyM9TVl1j5xGmhF4k/view?usp=drive_link",
    },
    {
      color: "Blanco",
      raceId: razaMap["Shih-Tzu"],
      url: "https://drive.google.com/file/d/1NKTs2A0wmMUzUuLuJW9qrRvGrO6AddYy/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Abisinio"],
      url: "https://drive.google.com/file/d/1VWOQRZfZw5yNFelnfgHfg-ZGi8OMZktK/view?usp=drive_link",
    },
    {
      color: "Azúl",
      raceId: razaMap["Azul-ruso"],
      url: "https://drive.google.com/file/d/1Zf-JA6P5vW_iXmv4tceyNReTagbvDKZT/view?usp=drive_link",
    },
    {
      color: "Negro",
      raceId: razaMap["Bombay"],
      url: "https://drive.google.com/file/d/1DQ3_U23DW6ppKI3bEpTFxA6I_yFDjFPD/view?usp=drive_link",
    },
    {
      color: "Gris",
      raceId: razaMap["Bosque-Noruega"],
      url: "https://drive.google.com/file/d/1FqB_02Odn5wSVnlDeP2b-WPk-rg90mxG/view?usp=drive_link",
    },
    {
      color: "Gris",
      raceId: razaMap["British-Shorthair"],
      url: "https://drive.google.com/file/d/1KyJZT1J37xJnd6nh5sQTTSRRpgrsQPMy/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Devon-Rex"],
      url: "https://drive.google.com/file/d/1tCebLrMl3_4YQHnw52v4MdQwSN0Shb0S/view?usp=drive_link",
    },
    {
      color: "Rosa",
      raceId: razaMap["Esfinge"],
      url: "https://drive.google.com/file/d/1U-B-RjGOxHLYrRx_hPqdRhjXG_X74wh3/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Pardo"],
      url: "https://drive.google.com/file/d/1FAV3s5j13w8BEjCW1k2gCTDJx-oOcuGd/view?usp=drive_link",
    },
    {
      color: "Naranja",
      raceId: razaMap["Pardo"],
      url: "https://drive.google.com/file/d/1dF09nMePb7leqQqgv6CH_zoW9y-1wo6e/view?usp=drive_link",
    },
    {
      color: "Gris",
      raceId: razaMap["Pardo"],
      url: "https://drive.google.com/file/d/1kYGUmkLCqzX53balIjOnPEoZfYSNzZ57/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Maine-coon"],
      url: "https://drive.google.com/file/d/1y18fSmNkkmgbnrTOvjTnSXDC3RsrearN/view?usp=drive_link",
    },
    {
      color: "Blanco",
      raceId: razaMap["Persa"],
      url: "https://drive.google.com/file/d/1ksFYyiMTOwSzwYCu1FBdUpCdxDb5ws2B/view?usp=drive_link",
    },
    {
      color: "Blanco",
      raceId: razaMap["Ragdoll"],
      url: "https://drive.google.com/file/d/1cYRJ40etSAEq9AXmv-FJ67UPibHPYtzc/view?usp=drive_link",
    },
    {
      color: "Café",
      raceId: razaMap["Siamés"],
      url: "https://drive.google.com/file/d/11yXnDEeo6EK2fb99rGEGCq6o4BwHhzTx/view?usp=drive_link",
    },
  ];

  await prisma.avatar.createMany({ data: avatares, skipDuplicates: true });

  /* ------------------------------ INSERT USERS ------------------------------ */

  const pswd = "secretPswd_1234";
  const hashedPassword = await bcrypt.hash(pswd, 10);

  const user1: User = {
    name: "Hanzeel",
    lastName: "Villa",
    email: "testemail@gmail.com",
    username: "Walle",
    password: hashedPassword
  }

  const user2: User = {
    name: "Luis",
    lastName: "Corona",
    email: "testemail2@gmail.com",
    username: "Invisiblre",
    password: hashedPassword
  }

  const createdUser1 = await prisma.user.create({ data: user1 });
  const createdUser2 = await prisma.user.create({ data: user2 });

  /* ---------------------------- INSERT REMINDERS ---------------------------- */

  const userId1 = createdUser1.id;
  const userId2 = createdUser2.id;

  const mydueDate1 = new Date("2026-11-31T10:00")
  const mydueDate2 = new Date("2026-12-31T10:00")

  const reminder1: Reminder = {
    title: "Sacar a pasear al Viejon",
    dueDate: mydueDate1,
    userId: userId1
  }

  const reminder2: Reminder = {
    title: "Llevar al vete al Viejon",
    description: "Desparacitación",
    dueDate: mydueDate2,
    userId: userId1
  }

  const reminder3: Reminder = {
    title: "Sacar a pasear a Candy",
    dueDate: mydueDate1,
    userId: userId2
  }

  const reminder4: Reminder = {
    title: "Llevar al vete a Candy",
    description: "Desparacitación",
    dueDate: mydueDate2,
    userId: userId2
  }

  await prisma.reminder.createMany({ data: [reminder1, reminder2, reminder3, reminder4] });
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
