import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAvatares(req: Request, res: Response) {
  try {
    const avatares = await prisma.avatar.findMany({
      select: {
        id: true,
        url: true,
        raza: {
          select: {
            name: true,
            especie: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: [
        { raza: { especie: { name: "asc" } } },
        { raza: { name: "asc" } },
      ],
    });

    const result = avatares.map((avatar) => ({
      id: avatar.id,
      raza: avatar.raza.name,
      especie: avatar.raza.especie.name,
      url: avatar.url,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching avatares", error });
  }
}
