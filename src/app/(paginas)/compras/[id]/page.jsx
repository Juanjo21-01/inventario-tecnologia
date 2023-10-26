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
    <>
      {!compra.message ? (
        <>
          <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
            Fecha de la compra:
            <span className="text-rose-500">
              {' '}
              {new Date(compra.fecha).toLocaleDateString()}
            </span>
          </h1>

          <h2 className="text-2xl font-bold text-blue-500 mt-3">
            Total de la compra: {compra.total}
          </h2>

          <section className="flex justify-around items-center gap-5 flex-wrap">
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Impuesto:
              </h2>
              <p className="text-xl text-gray-500 p-3">{compra.impuesto}</p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">Motivo:</h2>
              <p className="text-xl text-gray-500 p-3">{compra.motivo}</p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">Estado:</h2>
              <p className="text-xl text-gray-500 p-3">{estado.nombre}</p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Usuario:
              </h2>
              <p className="text-xl text-gray-500 p-3">{usuario.nombre}</p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Proveedor:
              </h2>
              <p className="text-xl text-gray-500 p-3">{proveedor.nombre}</p>
            </article>
          </section>

          <h3 className="text-3xl font-bold text-blue-500 mt-3">Detalle</h3>
          <ul className="m-5  rounded-lg p-2">
            {detalle.map((item) => (
              <li key={item.id} className="p-2 text-teal-500 font-bold">
                Cantidad:{' '}
                <span className="text-slate-900">{item.cantidad}</span> --
                Precio: <span className="text-slate-900">{item.precio}</span>
                -- Nombre:{' '}
                <span className="text-slate-900">{item.producto.nombre}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-rose-500 text-center font-bold">
            {compra.message}
          </h1>
        </>
      )}
      <Link
        href="/compras"
        className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 mx-5"
      >
        Volver a Compras
      </Link>
    </>
  );
}
