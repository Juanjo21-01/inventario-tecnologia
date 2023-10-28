import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';
import { prisma } from '@/libs/prisma';

const getUsuario = async (id) => {
  try {
    // Obtenemos un usuario de la base de datos
    const usuario = await prisma.usuario.findUnique({
      select: {
        nombre: true,
        email: true,
        createdAt: true,
        rol: {
          select: {
            id: true,
            nombre: true,
          },
        },
        Venta: {
          select: {
            id: true,
            fecha: true,
            total: true,
          },
        },
        Compra: {
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

    // Si no se encuentra el usuario, devolvemos un error
    if (!usuario)
      return {
        message: 'No se encontró el usuario',
      };

    return usuario;
  } catch (error) {
    return {
      message: 'Error al obtener el usuario',
    };
  }
};

export default async function usuario({ params: { id } }) {
  const usuario = await getUsuario(id);

  const rol = usuario.rol ? usuario.rol.nombre : '';
  const ventas = usuario.Venta || [];
  const compras = usuario.Compra || [];

  ventas.forEach((venta) => {
    venta.total = `Q.${venta.total}`;
    venta.fecha = new Date(venta.fecha).toLocaleDateString();
  });

  compras.forEach((compra) => {
    compra.total = `Q.${compra.total}`;
    compra.fecha = new Date(compra.fecha).toLocaleDateString();
  });

  const encabezadoVentas = ventas.length > 0 ? Object.keys(ventas[0]) : [];
  const encabezadoCompras = compras.length > 0 ? Object.keys(compras[0]) : [];

  const session = await getSession();

  return (
    <>
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
            className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 m-5"
          >
            Volver a Usuarios
          </Link>
        </>
      ) : (
        <AccesoDenegado />
      )}
    </>
  );
}
