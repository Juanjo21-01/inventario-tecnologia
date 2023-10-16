import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerUsuarios = async () =>
  prisma.usuario.findMany({
    select: {
      id: true,
      nombre: true,
      email: true,
    },
  });

const obtenerRoles = async () =>
  prisma.rol.findMany({
    where: {
      id: {
        not: 1,
      },
    },
    select: {
      id: true,
      nombre: true,
    },
  });

export default async function paginaUsuarios() {
  const usuarios = await obtenerUsuarios();
  const roles = await obtenerRoles();

  // listado de usuarios para la tabla
  const encabezado =
    usuarios.length > 0 ? Object.keys(usuarios[0]) : ['id', 'nombre', 'email'];

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

  const nombreRol = {
    id_role: roles,
  };

  const pathname = '/auth/signup';

  return (
    <div>
      <Link href="usuarios/roles">Roles</Link>
      <h2>Usuarios Registrados</h2>

      <Formulario campos={campos} pathname={pathname} />

      <Tabla
        thead={encabezado}
        tbody={usuarios}
        nombresRelaciones={nombreRol}
      />
    </div>
  );
}
