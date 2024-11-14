import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import facturaRoutes from "./routes/factura.routes.js";
import detalleRoutes from "./routes/detalle.routes.js";

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/factura", facturaRoutes);
app.use("/detalle", detalleRoutes);

// starting server
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
