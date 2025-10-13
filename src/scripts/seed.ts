import prisma from "../prisma-client";
import bcrypt from "bcrypt";

import defaultSpecies from "./data/species";
import defaultRaces from "./data/races";
import defaultAvatars from "./data/avatars";
import defaultUsers from "./data/users";

async function main() {

  /* ----------------------------- INSERT SPECIES ----------------------------- */

  await prisma.specie.createMany({ data: defaultSpecies, skipDuplicates: true });

  /* ------------------------------ INSERT RACES ------------------------------ */

  const speciesDb = await prisma.specie.findMany();

  // MAP = {specie.name: specie.id}
  const speciesMap = Object.fromEntries(speciesDb.map((e) => [e.name, e.id]));

  const racesFormatted = defaultRaces.map(race => {
    const specieName = race.specieName;
    const specieId = speciesMap[specieName.trim()];

    if (!specieId)
      throw new Error(`Specie not found for race ${race.name}: ${specieName}`);

    return { name: race.name, specieId }
  });

  await prisma.race.createMany({ data: racesFormatted, skipDuplicates: true });

  /* ----------------------------- INSERT AVATARS ----------------------------- */

  const racesDb = await prisma.race.findMany();

  // MAP = {race.name: race.id}
  const racesMap = Object.fromEntries(racesDb.map((r) => [r.name, r.id]));

  const avatarsFormatted = defaultAvatars.map(avatar => {
    const raceName = avatar.raceName;
    const raceId = racesMap[raceName.trim()];

    if (!raceId)
      throw new Error(`Race not found for avatar ${avatar.color}: ${raceName}`);

    return { color: avatar.color, raceId, url: avatar.url }
  });

  await prisma.avatar.createMany({ data: avatarsFormatted, skipDuplicates: true });

  /* ------------------------------ INSERT USERS ------------------------------ */

  const saltRounds = 10;

  const usersFormatted = await Promise.all(
    defaultUsers.map(async user => ({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: await bcrypt.hash(user.rawPassword, saltRounds)
    }))
  );

  await prisma.user.createMany({ data: usersFormatted, skipDuplicates: true });

  /* ------------------------------- INSER PETS ------------------------------- */

  // Pet 1
  const birthDatePet1 = new Date("2015-02-27");
  const beagleAvatar = await prisma.race.findUnique({
    where: { name: "Beagle" },
    include: { avatar: true }
  });

  // console.log(beagleAvatar);

  const beagleAvatarId = beagleAvatar?.avatar[0].id;

  // console.log(beagleAvatarId)

  if (!beagleAvatarId)
    throw new Error("Beagle avatar ID not found");

  const pet1: Pet = {
    name: "Viejon",
    birthDate: birthDatePet1,
    avatarId: beagleAvatarId,
    userId: createdUser1.id
  }

  // Pet 2
  const birthDatePet2 = new Date("2015-02-10");
  const siamesAvatar = await prisma.race.findUnique({
    where: { name: "Siamés" },
    include: { avatar: true }
  });

  // console.log(siamesAvatar);

  const siamesAvatarId = siamesAvatar?.avatar[0].id;

  // console.log(siamesAvatarId);

  if(!siamesAvatarId)
    throw new Error("Siames avatar ID not found");

  const pet2: Pet = {
    name: "Candy",
    birthDate: birthDatePet2,
    avatarId: siamesAvatarId,
    userId: createdUser2.id
  }

  await prisma.pet.createMany({ data: [pet1, pet2] })


  /* ---------------------------- INSERT REMINDERS ---------------------------- */

  /*

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
  */
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
