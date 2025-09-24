import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import { createReminder, getReminders } from "../controllers/reminders";

const router = Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
    getReminders(req, res);
});

router.post("/", verifyToken, (req: Request, res: Response) => {
    createReminder(req, res)
});

export default router;