import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const obtenerRoles = async () =>
  await prisma.rol.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
    },
  });

export default async function roles() {
  const roles = await obtenerRoles();
  const session = await getSession();

  // listado de roles para la tabla
  const encabezado =
    roles.length > 0 ? Object.keys(roles[0]) : ['id', 'nombre', 'descripcion'];

  const campos = {
    nombre: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    descripcion: {
      etiqueta: 'textarea',
      type: 'text',
      value: '',
    },
  };

  const pathname = '/usuarios/roles';

  return (
    <>
      {session.id_rol !== 3 ? (
        <>
          <h1 className="text-indigo-500 text-5xl font-bold text-center mb-3">
            Roles de los usuarios
          </h1>

          <Link
            className="text-2xl bg-teal-400 hover:bg-teal-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
            href="/usuarios"
          >
            Usuarios
          </Link>

          <Formulario campos={campos} pathname={pathname} />
          <Tabla thead={encabezado} tbody={roles} />
        </>
      ) : (
        <AccesoDenegado />
      )}
    </>
  );
}
