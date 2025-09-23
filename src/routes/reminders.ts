import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import { getReminders } from "../controllers/reminders";

const router = Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
    getReminders(req, res);
})

export default router;