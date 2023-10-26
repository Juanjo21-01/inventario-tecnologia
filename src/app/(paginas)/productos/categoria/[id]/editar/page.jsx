import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';
import Link from 'next/link';

const obtenerCategoria = async (id) =>
  await prisma.categoriaProductos.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      nombre: true,
      descripcion: true,
    },
  });

export default async function editarCategoria({ params: { id } }) {
  const data = await obtenerCategoria(id);
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

  const pathname = '/productos/categoria';
  return (
    <>
      {session.id_rol !== 3 ? (
        <>
          <h1 className="text-rose-500 text-4xl font-bold text-center mb-3">
            Editar Categoria No. {id}
          </h1>

          <Link
            className="text-xl bg-rose-400 hover:bg-rose-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
            href="/productos/categoria"
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
