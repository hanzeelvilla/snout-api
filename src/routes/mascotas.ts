import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import { getMascotas, createMascota } from "../controllers/mascotas";

const router = Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
  getMascotas(req, res);
});

router.post("/", verifyToken, (req: Request, res: Response) => {
  createMascota(req, res);
});

export default router;