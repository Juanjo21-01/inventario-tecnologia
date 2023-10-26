import Cards from '@/components/Cards/Cards';
import Link from 'next/link';

const getCategoria = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/productos/categoria/${id}`
  );
  const data = await response.json();
  return data;
};

export default async function informacionCategoria({ params: { id } }) {
  const categoria = await getCategoria(id);
  const productos = categoria.Producto || [];

  return (
    <div>
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
    </div>
  );
}
