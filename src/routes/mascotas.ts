import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import { getMascotas } from "../controllers/mascotas";
import { get } from "http";

const router = Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
  getMascotas(req, res);
});

export default router;