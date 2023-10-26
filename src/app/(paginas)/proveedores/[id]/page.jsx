import Cards from '@/components/Cards/Cards';
import Link from 'next/link';

const getProveedor = async (id) => {
  const response = await fetch(`http://localhost:3000/api/proveedores/${id}`);
  const data = await response.json();
  return data;
};

export default async function informacionProveedor({ params: { id } }) {
  const proveedor = await getProveedor(id);
  const productos = proveedor.Producto || [];

  return (
    <div>
      {!proveedor.message ? (
        <>
          <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
            Categoria:
            <span className="text-rose-500"> {proveedor.nombre} </span>
          </h1>

          <section className="flex justify-around items-center gap-5 flex-wrap">
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">Nit:</h2>
              <p className="text-xl text-gray-500 p-3">{proveedor.nit}</p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Correo Electrónico:
              </h2>
              <p className="text-xl text-gray-500 p-3">{proveedor.email}</p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Teléfono:
              </h2>
              <p className="text-xl text-gray-500 p-3">{proveedor.telefono}</p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Dirección:
              </h2>
              <p className="text-xl text-gray-500 p-3">{proveedor.direccion}</p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-gray-600 mt-3">
                Fecha de Creación:
              </h2>
              <p className="text-xl text-gray-500 p-3">
                {new Date(proveedor.createdAt).toLocaleDateString()}
              </p>
            </article>
          </section>

          <h2 className="text-3xl font-bold text-blue-500 mt-3">
            Productos de {proveedor.nombre}
          </h2>
          <Cards datos={productos} />
        </>
      ) : (
        <>
          <h1 className="text-4xl text-rose-500 text-center font-bold">
            {proveedor.message}
          </h1>
        </>
      )}
      <Link
        href="/proveedores"
        className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 mx-5"
      >
        Volver a Proveedores
      </Link>
    </div>
  );
}
