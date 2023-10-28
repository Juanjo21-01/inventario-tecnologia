import Cards from '@/components/Cards/Cards';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const getCategoria = async (id) => {
  try {
    // Obtenemos una categoria de la base de datos
    const categoria = await prisma.categoriaProductos.findUnique({
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
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra la categoria, devolvemos un error
    if (!categoria)
      return {
        message: 'No se encontró la categoria',
      };

    return categoria;
  } catch (error) {
    return {
      message: 'Error al obtener la categoria',
    };
  }
};

export default async function informacionCategoria({ params: { id } }) {
  const categoria = await getCategoria(id);
  const productos = categoria.Producto || [];

  return (
    <>
      {!categoria.message ? (
        <>
          <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
            Categoria:
            <span className="text-rose-500"> {categoria.nombre} </span>
          </h1>

          <section className="flex justify-around items-center gap-5 flex-wrap">
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Descripción:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {categoria.descripcion}
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Fecha de Creación:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {new Date(categoria.createdAt).toLocaleDateString()}
              </p>
            </article>
          </section>

          <h2 className="text-3xl font-bold text-blue-500 mt-3">
            Productos de {categoria.nombre}
          </h2>
          <Cards datos={productos} />
        </>
      ) : (
        <>
          <h1 className="text-4xl text-rose-500 text-center font-bold">
            {categoria.message}
          </h1>
        </>
      )}
      <Link
        href="/productos/categoria"
        className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 mx-5"
      >
        Volver a Categorias
      </Link>
    </>
  );
}
