import pool from "../config/db.js";

const findAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    res.json(error.message);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);
    if (row.length === 1) {
      res.json(row[0]);
    } else {
      res.json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

const create = async (req, res) => {
  const { dni, nombre, apellido, direccion, telefono } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, descripcion, stock, precio_compra, precio_venta) VALUES (?, ?, ?, ?, ?)",
      [dni, nombre, apellido, direccion, telefono]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.json(error.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, stock, precio_compra, precio_venta } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, descripcion = ?, stock = ?, precio_compra = ?, precio_venta = ? WHERE id = ?",
      [nombre, descripcion, stock, precio_compra, precio_venta, id]
    );
    if (result.affectedRows === 1) {
      res.json({ message: "Registro actualizado" });
    } else {
      res.json({ message: "Registro inexistente" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 1) {
      res.json({ message: "Registro eliminado" });
    } else {
      res.json({ message: "Registro inexistente" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

export const productosController = {
  findAll,
  findById,
  create,
  update,
  remove,
};
