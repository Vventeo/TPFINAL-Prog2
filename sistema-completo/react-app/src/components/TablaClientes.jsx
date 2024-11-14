import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const TablaClientes = ({ clientes, cliente, getClientes }) => {
  const { token } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [title, setTitle] = useState("");

  const openModal = (
    opcion,
    id,
    dni,
    nombre,
    apellido,
    direccion,
    telefono
  ) => {
    if (opcion === 1) {
      setTitle("Añadir nuevo cliente");
      setId("");
      setDni("");
      setNombre("");
      setApellido("");
      setDireccion("");
      setTelefono("");
    } else if (opcion === 2) {
      setTitle("Editar datos del cliente");
      setId(id);
      setDni(dni);
      setNombre(nombre);
      setApellido(apellido);
      setDireccion(direccion);
      setTelefono(telefono);
    }
    setTimeout(() => {
      document.getElementById("dni").focus();
    }, 500);
  };

  const sendDataCliente = async () => {
    // falta validar los datos (que no este vacio o solo espacios en blanco, etc.)
    try {
      const metodo = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:3000/clientes/${id}`
        : "http://localhost:3000/clientes";

      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dni, nombre, apellido, direccion, telefono }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert(
          id ? "Cliente actualizado con éxito" : "Cliente añadido con éxito"
        );
        document.getElementById("btnCerrar").click();
        getClientes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCliente = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar cliente?")) return;

    try {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        getClientes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => openModal(1)}
        data-bs-toggle="modal"
        data-bs-target="#clientesModal"
      >
        Añadir cliente
      </button>

      <div className="modal fade" id="clientesModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" value={id} />
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="dni"
                  className="form-control"
                  placeholder="DNI"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={sendDataCliente}
                className="btn btn-primary"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="table-secondary">
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((row) => (
            <tr key={row.id} onDoubleClick={() => cliente(row)}>
              <td>{row.dni}</td>
              <td>{row.nombre}</td>
              <td>{row.apellido}</td>
              <td>{row.direccion}</td>
              <td>{row.telefono}</td>
              <td>
                <ul className="list-inline m-0">
                  <li className="list-inline-item">
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onClick={() =>
                        openModal(
                          2,
                          row.id,
                          row.dni,
                          row.nombre,
                          row.apellido,
                          row.direccion,
                          row.telefono
                        )
                      }
                      title="Editar"
                      data-bs-toggle="modal"
                      data-bs-target="#clientesModal"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      title="Borrar"
                      onClick={() => deleteCliente(row.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablaClientes;
