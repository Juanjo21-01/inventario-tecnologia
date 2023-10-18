import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const obtenerRoles = async () =>
  prisma.rol.findMany({
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
    <div>
      {session.id_rol !== 3 ? (
        <>
          <Link href="/usuarios">Usuarios</Link>

          <h2>Roles de los usuarios</h2>
          <Formulario campos={campos} pathname={pathname} />
          <Tabla thead={encabezado} tbody={roles} />
        </>
      ) : (
        <AccesoDenegado />
      )}
    </div>
  );
}
