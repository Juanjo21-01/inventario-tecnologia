import Tabla from '@/components/Tabla/Tabla';

const getProveedor = async (id) => {
  const response = await fetch(`http://localhost:3000/api/proveedores/${id}`);
  const data = await response.json();
  return data;
};

export default async function informacionProveedor({ params: { id } }) {
  const proveedor = await getProveedor(id);
  const productos = proveedor.Producto;
  const encabezadoProductos =
    productos.length > 0 ? Object.keys(productos[0]) : [];

  return (
    <div>
      <h1> {proveedor.nombre} </h1>
      <p>Nit: {proveedor.nit}</p>
      <p>Email: {proveedor.email}</p>
      <p>Teléfono: {proveedor.telefono}</p>
      <p>Dirección: {proveedor.direccion}</p>
      <p>Fecha de Creación: {proveedor.createdAt}</p>

      <h2>Productos del Proveedor: {proveedor.nombre}</h2>

      {/* <Tabla thead={encabezadoProductos} tbody={productos} /> */}
    </div>
  );
}
