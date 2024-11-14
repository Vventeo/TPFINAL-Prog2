import { Router } from "express";
import { productosController } from "../controllers/productos.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", auth.verifyToken, productosController.findAll);
router.get("/:id", auth.verifyToken, productosController.findById);
router.post("/", auth.verifyToken, productosController.create);
router.put("/:id", auth.verifyToken, productosController.update);
router.delete("/:id", auth.verifyToken, productosController.remove);

export default router;
