import Router from "express";
import auth from "./auth";
import mascotas from "./mascotas";
import avatares from "./avatares";

const router = Router();

router.use("/auth", auth);
router.use("/mascotas", mascotas);
router.use("/avatares", avatares);

export default router;
