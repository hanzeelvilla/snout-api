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

export async function createMascota(req: Request, res: Response) {
  try {
    let userId: string | undefined;
    if (typeof req.user === "object" && req.user !== null && "id" in req.user) {
      userId = (req.user as { id: string }).id;
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, birthDate, avatarId } = req.body;

    if (!name || !birthDate || !avatarId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const avatar = await prisma.avatar.findUnique({
      where: { id: avatarId },
    });
    if (!avatar) {
      return res.status(404).json({ message: "Avatar not found" });
    }

    const birthDateObj = new Date(birthDate);

    const mascota = await prisma.mascota.create({
      data: {
        name,
        birthDate: birthDateObj,
        avatarId,
        userId,
      },
    });

    res.status(201).json(mascota);
  } catch (error) {
    res.status(500).json({
      message: "Error creating mascota",
      error,
    });
  }
}

export async function getMascotaById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let userId: string | undefined;
    if (typeof req.user === "object" && req.user !== null && "id" in req.user) {
      userId = (req.user as { id: string }).id;
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const mascota = await prisma.mascota.findFirst({
      where: { id, userId },
    });

    if (!mascota) {
      return res.status(404).json({ message: "Mascota not found" });
    }

    res.status(200).json(mascota);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching mascota",
      error,
    });
  }
}

export async function updateMascota(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let userId: string | undefined;
    if (typeof req.user === "object" && req.user !== null && "id" in req.user) {
      userId = (req.user as { id: string }).id;
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, birthDate, avatarId } = req.body;

    if (!name || !birthDate || !avatarId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verifica que la mascota pertenezca al usuario
    const mascotaExistente = await prisma.mascota.findFirst({
      where: { id, userId },
    });
    if (!mascotaExistente) {
      return res
        .status(404)
        .json({ message: "Mascota not found" });
    }

    const avatar = await prisma.avatar.findUnique({
      where: { id: avatarId },
    });
    if (!avatar) {
      return res.status(404).json({ message: "Avatar not found" });
    }

    const birthDateObj = new Date(birthDate);

    const mascota = await prisma.mascota.update({
      where: { id },
      data: {
        name,
        birthDate: birthDateObj,
        avatarId,
        userId,
      },
    });

    res.status(200).json(mascota);
  } catch (error) {
    res.status(500).json({
      message: "Error updating mascota",
      error,
    });
  }
}
