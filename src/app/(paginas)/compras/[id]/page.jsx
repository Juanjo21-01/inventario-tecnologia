import Link from 'next/link';

const getCompra = async (id) => {
  const response = await fetch(`http://localhost:3000/api/compras/${id}`);
  const compra = await response.json();
  return compra;
};

export default async function informacionCompra({ params: { id } }) {
  const compra = await getCompra(id);
  const usuario = compra.usuario;
  const proveedor = compra.proveedor;
  const estado = compra.estado;
  const detalle = compra.DetalleCompra;

  return (
    <div>
      {!compra.message ? (
        <>
          <h1>{compra.motivo}</h1>

          <h2>Total de la compra: {compra.total}</h2>
          <p>Impuesto: {compra.impuesto}</p>
          <p>Fecha: {compra.fecha}</p>

          <p>Estado: {estado.nombre}</p>
          <p>Usuario: {usuario.nombre}</p>
          <p>Proveedor: {proveedor.nombre}</p>

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
          <h1>{compra.message}</h1>

          <Link href="/compras">Volver a Compras</Link>
        </>
      )}
    </div>
  );
}
