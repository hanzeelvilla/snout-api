import {Router, Request, Response} from "express";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.send("Login");
});

router.get("/sign-up", (req: Request, res: Response) => {
  res.send("Sign Up");
});

export default router;