import pool from "../config/db.js";

const addItem = async (req, res) => {
  const { productoId, facturaId, cantidad } = req.body;
  try {
    const [result] = await pool.query(
      "CALL sp_agregar_item_detalle (?, ?, ?)",
      [productoId, facturaId, cantidad]
    );
    res.json(result[0]);
  } catch (error) {
    res.json(error.message);
  }
};

const removeItem = async (req, res) => {
  const { productoId, facturaId } = req.body;
  try {
    const [result] = await pool.query("CALL sp_quitar_item_detalle (?, ?)", [
      productoId,
      facturaId,
    ]);
    res.json(result[0]);
  } catch (error) {
    res.json(error.message);
  }
};

export const detalleController = {
  addItem,
  removeItem,
};
