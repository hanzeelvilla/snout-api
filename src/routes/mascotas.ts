import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import {
  getMascotas,
  getMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
} from "../controllers/mascotas";

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

router.put("/:id", verifyToken, (req: Request, res: Response) => {
  updateMascota(req, res);
});

router.delete("/:id", verifyToken, (req: Request, res: Response) => {
  deleteMascota(req, res);
});

export default router;
