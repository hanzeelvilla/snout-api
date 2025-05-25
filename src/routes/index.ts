import Router from "express";
import auth from "./auth";
import mascotas from "./mascotas";

const router = Router();

router.use("/auth", auth);
router.use("/mascotas", mascotas);

export default router;
