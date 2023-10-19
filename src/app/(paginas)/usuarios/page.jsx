import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const obtenerUsuarios = async () =>
  await prisma.usuario.findMany({
    select: {
      id: true,
      nombre: true,
      email: true,
      id_rol: true,
    },
  });

const obtenerRoles = async () =>
  await prisma.rol.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });

export default async function paginaUsuarios() {
  const usuarios = await obtenerUsuarios();
  let roles = await obtenerRoles();

  const session = await getSession();

  // listado de usuarios para la tabla
  const encabezado =
    usuarios.length > 0 ? Object.keys(usuarios[0]) : ['id', 'nombre', 'email'];

  const nombreRol = {
    id_rol: roles,
  };

  // eliminar el rol administrador

  roles = roles.filter((rol) => rol.id !== 1);

  const campos = {
    nombre: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    email: {
      etiqueta: 'input',
      type: 'email',
      value: '',
    },
    password: {
      etiqueta: 'input',
      type: 'password',
      value: '',
    },
    id_rol: {
      etiqueta: 'select',
      type: 'text',
      value: 0,
      informacion: roles,
    },
  };

  const pathname = '/auth/signup';

  return (
    <div>
      {session.id_rol !== 3 ? (
        <>
          <Link href="usuarios/roles">Roles</Link>
          <h2>Usuarios Registrados</h2>

          <Formulario campos={campos} pathname={pathname} />

          <Tabla
            thead={encabezado}
            tbody={usuarios}
            nombresRelaciones={nombreRol}
          />
        </>
      ) : (
        <AccesoDenegado />
      )}
    </div>
  );
}
