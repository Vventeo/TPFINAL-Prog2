import pool from "../config/db.js";

const createAndLastId = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const [result] = await pool.query(
      "CALL sp_agregar_factura (?, @output); SELECT @output AS ultimoId;", // aqui tenemos 2 consultas: multipleStatements: true (db.js)
      [clienteId]
    );
    res.json(result[1][0]);
  } catch (error) {
    res.json(error.message);
  }
};

export const facturaController = {
  createAndLastId,
};
