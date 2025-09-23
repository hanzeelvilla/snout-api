import Router from "express";
import auth from "./auth";
import mascotas from "./mascotas";
import avatares from "./avatares";
import reminders from "./reminders";

const router = Router();

router.use("/auth", auth);
router.use("/mascotas", mascotas);
router.use("/avatares", avatares);
router.use("/reminders", reminders)

export default router;
