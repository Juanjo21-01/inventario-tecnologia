import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const getUsuario = async (id) => {
  const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
  const data = await response.json();
  return data;
};

export default async function usuario({ params: { id } }) {
  const usuario = await getUsuario(id);
  const rol = usuario.rol.nombre;
  const ventas = usuario.Venta;
  const compras = usuario.Compra;

  const encabezadoVentas = ventas.length > 0 ? Object.keys(ventas[0]) : [];
  const encabezadoCompras = compras.length > 0 ? Object.keys(compras[0]) : [];

  const session = await getSession();

  return (
    <div>
      {session.id_rol !== 3 ? (
        <>
          {!usuario.message ? (
            <>
              <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
                Usuario:
                <span className="text-rose-500"> {usuario.nombre} </span>
              </h1>

              <section className="flex justify-around items-center gap-5 flex-wrap">
                <article>
                  <h2 className="text-2xl font-bold text-gray-600 mt-3">
                    Correo Electrónico:
                  </h2>
                  <p className="text-xl text-gray-500 p-3">{usuario.email}</p>
                </article>
                <article>
                  <h2 className="text-2xl font-bold text-gray-600 mt-3">
                    Fecha de Creación:
                  </h2>
                  <p className="text-xl text-gray-500 p-3">
                    {new Date(usuario.createdAt).toLocaleDateString()}
                  </p>
                </article>
              </section>

              <h3 className="text-teal-500 text-2xl font-bold">Rol: {rol}</h3>

              <h2 className="text-3xl font-bold text-blue-500 mt-3">Ventas</h2>
              <Tabla thead={encabezadoVentas} tbody={ventas} />

              <h2 className="text-3xl font-bold text-blue-500 mt-3">Compras</h2>
              <Tabla thead={encabezadoCompras} tbody={compras} />
            </>
          ) : (
            <h1 className="text-4xl text-rose-500 text-center font-bold">
              {usuario.message}
            </h1>
          )}
          <Link
            href="/usuarios"
            className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 m-5"
          >
            Volver a Usuarios
          </Link>
        </>
      ) : (
        <AccesoDenegado />
      )}
    </div>
  );
}
