import {Router, Request, Response} from "express";
import { singUpValidation } from "../middlewares/auth";
import { signUp } from "../controllers/auth";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.send("Login");
});

router.post("/sign-up", singUpValidation, (req: Request, res: Response) => {
  signUp(req, res);
});

export default router;