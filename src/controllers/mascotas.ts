import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMascotas(req: Request, res: Response) {
  try {
    let userId: string | undefined;
    if (typeof req.user === "object" && req.user !== null && "id" in req.user) {
      userId = (req.user as { id: string }).id;
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const mascotas = await prisma.mascota.findMany({
      where: { userId },
    });
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching mascotas",
      error,
    });
  }
}