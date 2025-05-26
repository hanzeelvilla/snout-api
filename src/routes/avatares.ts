import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { getAvatares } from "../controllers/avatares";
import { get } from "http";

const router = Router();

router.get("/", verifyToken, async (req, res) => {
    getAvatares(req, res);
});

export default router;