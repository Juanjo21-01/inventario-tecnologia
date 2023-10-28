import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const getProducto = async (id) => {
  try {
    // Obtenemos un producto de la base de datos
    const producto = await prisma.producto.findUnique({
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        codigo_SKU: true,
        precio: true,
        stock: true,
        createdAt: true,
        estado: {
          select: {
            id: true,
            nombre: true,
          },
        },
        proveedor: {
          select: {
            id: true,
            nombre: true,
          },
        },
        categoria: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el producto, devolvemos un error
    if (!producto)
      return {
        message: 'No se encontró el producto',
      };

    return producto;
  } catch (error) {
    return {
      message: 'Error al obtener el producto',
    };
  }
};

export default async function informacionProducto({ params: { id } }) {
  const producto = await getProducto(id);
  return (
    <>
      {!producto.message ? (
        <>
          <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
            Producto:
            <span className="text-rose-500"> {producto.nombre} </span>
          </h1>

          <section className="flex justify-around items-center gap-5 flex-wrap">
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">Precio:</h2>
              <p className="text-xl text-gray-500 p-3">{producto.precio}</p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">Stock:</h2>
              <p className="text-xl text-gray-500 p-3">{producto.stock}</p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Codigo SKU:
              </h2>
              <p className="text-xl text-gray-500 p-3">{producto.codigo_SKU}</p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Proveedor:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {producto.proveedor.nombre}
              </p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Categoria:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {producto.categoria.nombre}
              </p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">Estado:</h2>
              <p className="text-xl text-gray-500 p-3">
                {producto.estado.nombre}
              </p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Descripcion:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {producto.descripcion}
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Fecha de Creación:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {new Date(producto.createdAt).toLocaleDateString()}
              </p>
            </article>
          </section>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-rose-500 text-center font-bold">
            {producto.message}
          </h1>
        </>
      )}
      <Link
        href="/productos"
        className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 mx-5"
      >
        Volver a Productos
      </Link>
    </>
  );
}
