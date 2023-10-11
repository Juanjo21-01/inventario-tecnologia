import Tabla from '@/components/Tabla/Tabla';

const getEstado = async (id) => {
  const response = await fetch(`http://localhost:3000/api/estados/${id}`);
  const data = await response.json();
  return data;
};

export default async function informacionEstado({ params: { id } }) {
  const estado = await getEstado(id);

  const productos = estado.Producto;
  const compras = estado.Compra;
  const ventas = estado.Venta;

  console.log(productos);
  console.log(compras);
  console.log(ventas);

  const encabezadoProductos =
    productos.length > 0 ? Object.keys(productos[0]) : [];

  const encabezadoCompras = compras.length > 0 ? Object.keys(compras[0]) : [];

  const encabezadoVentas = ventas.length > 0 ? Object.keys(ventas[0]) : [];

  return (
    <div>
      <h1>{estado.nombre}</h1>

      <p>Descripción: {estado.descripcion}</p>
      <p>Fecha de Creación: {estado.createdAt}</p>

      <h2>Productos</h2>
      <Tabla thead={encabezadoProductos} tbody={productos} />

      <h2>Compras</h2>
      <Tabla thead={encabezadoCompras} tbody={compras} />

      <h2>Ventas</h2>
      <Tabla thead={encabezadoVentas} tbody={ventas} />
    </div>
  );
}
