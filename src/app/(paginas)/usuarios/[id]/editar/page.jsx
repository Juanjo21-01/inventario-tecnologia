import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';

const obtenerUsuario = async (id) =>
  prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      nombre: true,
      email: true,
      password: true,
      id_rol: true,
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

export default async function editarUsuario({ params: { id } }) {
  const usuario = await obtenerUsuario(id);
  const roles = await obtenerRoles();

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

  const pathname = '/usuarios';

  return (
    <>
      <h1>Editar Usuario No. {id}</h1>

      <Formulario
        id={id}
        campos={campos}
        datosActualizar={usuario}
        pathname={pathname}
      />
    </>
  );
}
