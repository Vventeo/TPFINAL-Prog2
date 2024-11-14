import { Router } from "express";
import { facturaController } from "../controllers/factura.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:clienteId", auth.verifyToken, facturaController.createAndLastId);

export default router;
