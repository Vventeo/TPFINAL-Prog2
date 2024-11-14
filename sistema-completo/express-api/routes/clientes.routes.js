import { Router } from "express";
import { clientesController } from "../controllers/clientes.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", auth.verifyToken, clientesController.findAll); // auth.verifyToken, auth.verifyAdmin
router.get("/:id", auth.verifyToken, clientesController.findById);
router.post("/", auth.verifyToken, clientesController.create);
router.put("/:id", auth.verifyToken, clientesController.update);
router.delete("/:id", auth.verifyToken, clientesController.remove);

export default router;
