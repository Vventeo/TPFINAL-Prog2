import { Router } from "express";
import { detalleController } from "../controllers/detalle.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/agregar-item", auth.verifyToken, detalleController.addItem);

router.post("/quitar-item", auth.verifyToken, detalleController.removeItem);

export default router;
