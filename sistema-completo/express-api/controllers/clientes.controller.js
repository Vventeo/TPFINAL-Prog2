import pool from "../config/db.js";

const findAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (error) {
    res.json(error.message);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
    if (row.length === 1) {
      res.json(row[0]);
    } else {
      res.json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

const create = async (req, res) => {
  const { dni, nombre, apellido, direccion, telefono } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO clientes (dni, nombre, apellido, direccion, telefono) VALUES (?, ?, ?, ?, ?)",
      [dni, nombre, apellido, direccion, telefono]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.json(error.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { dni, nombre, apellido, direccion, telefono } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE clientes SET dni = ?, nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE id = ?",
      [dni, nombre, apellido, direccion, telefono, id]
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
    const [result] = await pool.query("DELETE FROM clientes WHERE id = ?", [
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

export const clientesController = { findAll, findById, create, update, remove };
