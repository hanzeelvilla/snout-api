import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import { getMascotas, getMascotaById, createMascota } from "../controllers/mascotas";
import { get } from "http";

const router = Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
  getMascotas(req, res);
});

router.get("/:id", verifyToken, (req: Request, res: Response) => {
  getMascotaById(req, res);
});

router.post("/", verifyToken, (req: Request, res: Response) => {
  createMascota(req, res);
});

export default router;