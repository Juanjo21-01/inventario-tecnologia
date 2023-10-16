import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';

const obtenerRol = async (id) =>
  prisma.rol.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      nombre: true,
      descripcion: true,
    },
  });

export default async function editarRol({ params: { id } }) {
  const data = await obtenerRol(id);

  const campos = {
    nombre: {
      etiqueta: 'input',
      type: 'text',
      value: data.nombre,
    },
    descripcion: {
      etiqueta: 'textarea',
      type: 'text',
      value: data.descripcion,
    },
  };

  const pathname = '/usuarios/roles';

  return (
    <>
      <h1>Editar Rol No. {id}</h1>

      <Formulario
        id={id}
        campos={campos}
        datosActualizar={data}
        pathname={pathname}
      />
    </>
  );
}
