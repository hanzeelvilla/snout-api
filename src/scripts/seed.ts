import prisma from "../prisma-client";
import bcrypt from "bcrypt";

import defaultSpecies from "./data/species";
import defaultRaces from "./data/races";
import defaultAvatars from "./data/avatars";
import defaultUsers from "./data/users";
import defaultPets from "./data/pet";
import defaultReminders from "./data/reminders";

async function main() {
  /* ----------------------------- INSERT SPECIES ----------------------------- */

  await prisma.specie.createMany({
    data: defaultSpecies,
    skipDuplicates: true,
  });

  /* ------------------------------ INSERT RACES ------------------------------ */

  const speciesDb = await prisma.specie.findMany();

  // MAP = {specie.name: specie.id}
  const speciesMap = Object.fromEntries(speciesDb.map((e) => [e.name, e.id]));

  const racesFormatted = defaultRaces.map((race) => {
    const specieName = race.specieName;
    const specieId = speciesMap[specieName.trim()];

    if (!specieId)
      throw new Error(`Specie not found for race ${race.name}: ${specieName}`);

    return { name: race.name, specieId };
  });

  await prisma.race.createMany({ data: racesFormatted, skipDuplicates: true });

  /* ----------------------------- INSERT AVATARS ----------------------------- */

  const racesDb = await prisma.race.findMany();

  // MAP = {race.name: race.id}
  const racesMap = Object.fromEntries(racesDb.map((r) => [r.name, r.id]));

  const avatarsFormatted = defaultAvatars.map((avatar) => {
    const raceName = avatar.raceName;
    const raceId = racesMap[raceName.trim()];

    if (!raceId)
      throw new Error(`Race not found for avatar ${avatar.color}: ${raceName}`);

    return { color: avatar.color, raceId, url: avatar.url };
  });

  await prisma.avatar.createMany({
    data: avatarsFormatted,
    skipDuplicates: true,
  });

  /* ------------------------------ INSERT USERS ------------------------------ */

  const saltRounds = 10;

  const usersFormatted = await Promise.all(
    defaultUsers.map(async (user) => ({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: await bcrypt.hash(user.rawPassword, saltRounds),
    })),
  );

  await prisma.user.createMany({ data: usersFormatted, skipDuplicates: true });

  /* ------------------------------- INSER PETS ------------------------------- */

  const usersDb = await prisma.user.findMany();
  const usersMap = Object.fromEntries(usersDb.map((u) => [u.username, u.id]));

  const racesDbFull = await prisma.race.findMany({ include: { avatar: true } });
  const racesMapWithAvatars = Object.fromEntries(
    racesDbFull.map((r) => [r.name, r]),
  );

  const petsFormatted = defaultPets.map((p) => {
    const race = racesMapWithAvatars[p.avatarRaceName.trim()];
    if (!race)
      throw new Error(`Race not found for pet ${p.name}: ${p.avatarRaceName}`);

    const avatarId = race.avatar[0].id;
    if (!avatarId)
      throw new Error(`No avatar found for race ${p.avatarRaceName}`);

    const userId = usersMap[p.ownerUsername];
    if (!userId) throw new Error(`User not found: ${p.ownerUsername}`);

    return {
      name: p.name,
      birthDate: new Date(p.birthDate),
      avatarId,
      userId,
    };
  });

  await prisma.pet.createMany({ data: petsFormatted });

  /* ---------------------------- INSERT REMINDERS ---------------------------- */

  const remindersFormatted = defaultReminders.map((r) => {
    const userId = usersMap[r.userName];
    if (!userId) throw new Error(`User not found for reminder: ${r.userName}`);

    return {
      title: r.title,
      description: r.description ?? null,
      dueDate: r.dueDate,
      userId,
    };
  });

  await prisma.reminder.createMany({
    data: remindersFormatted,
    skipDuplicates: true,
  });

  await prisma.reminder.createMany({data: remindersFormatted});
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
