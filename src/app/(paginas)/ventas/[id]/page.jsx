import { prisma } from '@/libs/prisma';
import Link from 'next/link';

const getVenta = async (id) => {
  try {
    // Obtenemos una venta de la base de datos
    const venta = await prisma.venta.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        fecha: true,
        total: true,
        motivo: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
          },
        },
        estado: {
          select: {
            id: true,
            nombre: true,
          },
        },
        DetalleVenta: {
          select: {
            id: true,
            cantidad: true,
            precio: true,
            producto: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    // Si no se encuentra la venta, devolvemos un error
    if (!venta)
      return {
        message: 'No se encontró la venta',
      };

    console.log(venta);
    return venta;
  } catch (error) {
    return {
      message: 'Error al obtener la venta',
    };
  }
};

export default async function informacionCompra({ params: { id } }) {
  const venta = await getVenta(id);
  const usuario = venta.usuario;
  const estado = venta.estado;
  const detalle = venta.DetalleVenta;

  return (
    <>
      {!venta.message ? (
        <>
          <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
            Fecha de la venta:
            <span className="text-rose-500">
              {' '}
              {new Date(venta.fecha).toLocaleDateString()}
            </span>
          </h1>

          <h2 className="text-2xl font-bold text-blue-500 mt-3">
            Total de la venta: {venta.total}
          </h2>

          <section className="flex justify-around items-center gap-5 flex-wrap">
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">Motivo:</h2>
              <p className="text-xl text-gray-500 p-3">{venta.motivo}</p>
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
            {venta.message}
          </h1>
        </>
      )}
      <Link
        href="/ventas"
        className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 mx-5"
      >
        Volver a Ventas
      </Link>
    </>
  );
}
