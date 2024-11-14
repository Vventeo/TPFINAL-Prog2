const TablaProductos = ({ productos, producto }) => {
  return (
    <table className="table table-hover">
      <thead className="table-success">
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Stock</th>
          <th>Precio compra</th>
          <th>Precio venta</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((row) => (
          <tr key={row.id} onDoubleClick={() => producto(row)}>
            <td>{row.nombre}</td>
            <td>{row.descripcion}</td>
            <td>{row.stock}</td>
            <td>{row.precio_compra}</td>
            <td>{row.precio_venta}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProductos;
