import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';
import Link from 'next/link';

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
    <>
      {session.id_rol !== 3 ? (
        <>
          <h1 className="text-rose-500 text-4xl font-bold text-center mb-3">
            Editar Estado No. {id}
          </h1>

          <Link
            className="text-xl bg-rose-400 hover:bg-rose-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
            href="/estados"
          >
            Regresar
          </Link>

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
    </>
  );
}
