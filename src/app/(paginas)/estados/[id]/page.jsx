import Cards from '@/components/Cards/Cards';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const getEstado = async (id) => {
  try {
    // Obtenemos un estado de la base de datos
    const estado = await prisma.estado.findUnique({
      select: {
        nombre: true,
        descripcion: true,
        createdAt: true,
        Producto: {
          select: {
            id: true,
            nombre: true,
            precio: true,
            stock: true,
          },
        },
        Compra: {
          select: {
            id: true,
            fecha: true,
            total: true,
          },
        },
        Venta: {
          select: {
            id: true,
            fecha: true,
            total: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el estado, devolvemos un error
    if (!estado)
      return {
        message: 'No se encontró el estado',
      };

    return estado;
  } catch (error) {
    return {
      message: 'Error al obtener el estado',
    };
  }
};

export default async function informacionEstado({ params: { id } }) {
  const estado = await getEstado(id);
  const productos = estado.Producto || [];
  const compras = estado.Compra || [];
  const ventas = estado.Venta || [];

  // quitar datos innecesarios
  productos.forEach((producto) => {
    producto.precio = `Q.${producto.precio}`;
    producto.stock = `${producto.stock} unidades`;
  });

  compras.forEach((compra) => {
    compra.total = `Q.${compra.total}`;
    compra.fecha = new Date(compra.fecha).toLocaleDateString();
  });

  ventas.forEach((venta) => {
    venta.total = `Q.${venta.total}`;
    venta.fecha = new Date(venta.fecha).toLocaleDateString();
  });

  return (
    <>
      {!estado.message ? (
        <>
          <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
            Estado:
            <span className="text-rose-500"> {estado.nombre} </span>
          </h1>

          <section className="flex justify-around items-center gap-5 flex-wrap">
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Descripción:
              </h2>
              <p className="text-xl text-gray-500 p-3">{estado.descripcion}</p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Fecha de Creación:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {new Date(estado.createdAt).toLocaleDateString()}
              </p>
            </article>
          </section>

          <h2 className="text-3xl font-bold text-blue-500 mt-3">
            Productos {estado.nombre}s
          </h2>
          <Cards datos={productos} />

          <h2 className="text-3xl font-bold text-blue-500 mt-3">
            Compras {estado.nombre}s
          </h2>
          <Cards datos={compras} />

          <h2 className="text-3xl font-bold text-blue-500 my-3">
            Ventas {estado.nombre}s
          </h2>
          <Cards datos={ventas} />
        </>
      ) : (
        <h1 className="text-4xl text-rose-500 text-center font-bold">
          {estado.message}
        </h1>
      )}
      <Link
        href="/estados"
        className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 m-5"
      >
        Volver a Estados
      </Link>
    </>
  );
}
