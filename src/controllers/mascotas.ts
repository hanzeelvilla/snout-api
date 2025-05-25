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
      include: {
        avatar: {
          select: {
            url: true,
            raza: {
              select: {
                name: true,
                especie: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const result = mascotas.map((mascota) => ({
      id: mascota.id,
      name: mascota.name,
      birthDate: mascota.birthDate,
      especie: mascota.avatar.raza.especie.name,
      raza: mascota.avatar.raza.name,
      urlAvatar: mascota.avatar.url,
      updatedAt: mascota.updatedAt,
      createdAt: mascota.createdAt,
    }));

    res.status(200).json(result);
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

    const birthDateObj = new Date(birthDate);

    const mascota = await prisma.mascota.create({
      data: {
        name,
        birthDate: birthDateObj,
        avatarId,
        userId,
      },
      include: {
        avatar: {
          select: {
            url: true,
            raza: {
              select: {
                name: true,
                especie: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const result = {
      id: mascota.id,
      name: mascota.name,
      birthDate: mascota.birthDate,
      especie: mascota.avatar.raza.especie.name,
      raza: mascota.avatar.raza.name,
      urlAvatar: mascota.avatar.url,
      updatedAt: mascota.updatedAt,
      createdAt: mascota.createdAt,
    };

    res.status(201).json(result);
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
      include: {
        avatar: {
          select: {
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
        },
      },
    });

    if (!mascota) {
      return res.status(404).json({ message: "Mascota not found" });
    }

    const result = {
      id: mascota.id,
      name: mascota.name,
      birthDate: mascota.birthDate,
      especie: mascota.avatar.raza.especie.name,
      raza: mascota.avatar.raza.name,
      urlAvatar: mascota.avatar.url,
      updatedAt: mascota.updatedAt,
      createdAt: mascota.createdAt,
    };

    res.status(200).json(result);
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
      return res.status(404).json({ message: "Mascota not found" });
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
      include: {
        avatar: {
          select: {
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
        },
      },
    });

    const result = {
      id: mascota.id,
      name: mascota.name,
      birthDate: mascota.birthDate,
      especie: mascota.avatar.raza.especie.name,
      raza: mascota.avatar.raza.name,
      urlAvatar: mascota.avatar.url,
      updatedAt: mascota.updatedAt,
      createdAt: mascota.createdAt,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error updating mascota",
      error,
    });
  }
}

export async function deleteMascota(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let userId: string | undefined;
    if (typeof req.user === "object" && req.user !== null && "id" in req.user) {
      userId = (req.user as { id: string }).id;
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verifica que la mascota pertenezca al usuario
    const mascotaExistente = await prisma.mascota.findFirst({
      where: { id, userId },
    });
    if (!mascotaExistente) {
      return res.status(404).json({ message: "Mascota not found" });
    }

    await prisma.mascota.delete({
      where: { id },
    });

    res.status(204).json({ message: "Mascota deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting mascota",
      error,
    });
  }
}
