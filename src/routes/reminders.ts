import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
    res.send("Hola soy Reminders");
})

export default router;