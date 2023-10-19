import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const obtenerEstado = async (id) =>
  await prisma.estado.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      nombre: true,
      descripcion: true,
    },
  });

export default async function editarEstado({ params: { id } }) {
  const data = await obtenerEstado(id);
  const session = await getSession();

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

  const pathname = '/estados';
  return (
    <div>
      {session.id_rol !== 3 ? (
        <>
          {' '}
          <h1>Editar Estado No. {id}</h1>
          <Formulario
            id={id}
            campos={campos}
            datosActualizar={data}
            pathname={pathname}
          />
        </>
      ) : (
        <AccesoDenegado />
      )}
    </div>
  );
}
