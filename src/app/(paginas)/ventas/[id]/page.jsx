import Link from 'next/link';

const getVenta = async (id) => {
  const response = await fetch(`http://localhost:3000/api/ventas/${id}`);
  const venta = await response.json();
  return venta;
};

export default async function informacionCompra({ params: { id } }) {
  const venta = await getVenta(id);
  const usuario = venta.usuario;
  const estado = venta.estado;
  const detalle = venta.DetalleVenta;

  return (
    <div>
      {!venta.message ? (
        <>
          <h1>{venta.motivo}</h1>

          <h2>Total de la venta: {venta.total}</h2>
          <p>Fecha: {venta.fecha}</p>

          <p>Estado: {estado.nombre}</p>
          <p>Usuario: {usuario.nombre}</p>

          <h3>Detalle</h3>
          <ul>
            {detalle.map((item) => (
              <li key={item.id}>
                Cantidad: {item.cantidad} -- Precio: {item.precio} -- Nombre:{' '}
                {item.producto.nombre}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1>{venta.message}</h1>

          <Link href="/ventas">Volver a Ventas</Link>
        </>
      )}
    </div>
  );
}
