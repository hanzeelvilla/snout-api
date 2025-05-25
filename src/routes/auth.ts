import { Router, Request, Response } from "express";
import { loginValidation, singUpValidation } from "../middlewares/auth";
import { login, signUp } from "../controllers/auth";

const router = Router();

router.post("/login", loginValidation, (req: Request, res: Response) => {
  login(req, res);
});

router.post("/sign-up", singUpValidation, (req: Request, res: Response) => {
  signUp(req, res);
});

export default router;
