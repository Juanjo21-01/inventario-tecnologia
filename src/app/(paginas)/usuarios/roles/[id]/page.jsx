import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';
import { prisma } from '@/libs/prisma';

const getRol = async (id) => {
  try {
    // Obtenemos un rol de la base de datos
    const rol = await prisma.rol.findUnique({
      select: {
        nombre: true,
        descripcion: true,
        createdAt: true,
        Usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el rol, devolvemos un error
    if (!rol)
      return {
        message: 'No se encontró el rol',
      };

    return rol;
  } catch (error) {
    return {
      message: 'Error al obtener el rol',
    };
  }
};

export default async function rol({ params: { id } }) {
  const rol = await getRol(id);
  const session = await getSession();

  const usuarios = rol.Usuario || [];

  const encabezadoUsuarios =
    usuarios.length > 0 ? Object.keys(usuarios[0]) : [];

  return (
    <div>
      {session.id_rol !== 3 ? (
        <>
          {!rol.message ? (
            <>
              <h1 className="text-teal-500 text-4xl font-bold text-center mb-3">
                Rol:
                <span className="text-rose-500"> {rol.nombre} </span>
              </h1>

              <section className="flex justify-around items-center gap-5 flex-wrap">
                <article>
                  <h2 className="text-2xl font-bold text-gray-600 mt-3">
                    Descripción:
                  </h2>
                  <p className="text-xl text-gray-500 p-3">{rol.descripcion}</p>
                </article>

                <article>
                  <h2 className="text-2xl font-bold text-gray-600 mt-3">
                    Fecha de Creación:
                  </h2>
                  <p className="text-xl text-gray-500 p-3">
                    {new Date(rol.createdAt).toLocaleDateString()}
                  </p>
                </article>
              </section>

              <h2 className="text-3xl font-bold text-blue-500 mt-3">
                Usuarios
              </h2>
              <Tabla thead={encabezadoUsuarios} tbody={usuarios} />
            </>
          ) : (
            <>
              <h1 className="text-4xl text-rose-500 text-center font-bold">
                {rol.message}
              </h1>
            </>
          )}
          <Link
            href="/usuarios/roles"
            className="px-4 py-2 bg-rose-500 rounded-md text-zinc-50 p-5 mx-5"
          >
            Volver a Roles
          </Link>
        </>
      ) : (
        <AccesoDenegado />
      )}
    </div>
  );
}
