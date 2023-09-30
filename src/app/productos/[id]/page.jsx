const getProducto = async (id) => {
  const response = await fetch(`http://localhost:3000/api/productos/${id}`);
  const data = await response.json();
  return data;
};

export default async function informacionProducto({ params: { id } }) {
  const producto = await getProducto(id);
  return (
    <div>
      <h1> {producto.nombre} </h1>
      <p>Descripcion: {producto.descripcion}</p>
      <p>Precio: {producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <p>SKU: {producto.codigo_SKU}</p>
      <p>Fecha de Creación: {producto.createdAt}</p>
      <p>Proveedor: {producto.proveedor.nombre}</p>
      <p>Categoria: {producto.categoria.nombre}</p>
      <p>Estado: {producto.estado.nombre}</p>
    </div>
  );
}
