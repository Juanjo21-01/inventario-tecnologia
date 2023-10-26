import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';
import Link from 'next/link';

const obtenerProveedores = async (id) =>
  await prisma.proveedor.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      nombre: true,
      nit: true,
      email: true,
      telefono: true,
      direccion: true,
    },
  });

export default async function editarProveedor({ params: { id } }) {
  const data = await obtenerProveedores(id);
  const session = await getSession();

  const campos = {
    nombre: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    nit: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    email: {
      etiqueta: 'input',
      type: 'email',
      value: '',
    },
    telefono: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    direccion: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
  };

  const pathname = '/proveedores';
  return (
    <>
      {session.id_rol !== 3 ? (
        <>
          <h1 className="text-rose-500 text-4xl font-bold text-center mb-3">
            Editar Proveedor No. {id}
          </h1>

          <Link
            className="text-xl bg-rose-400 hover:bg-rose-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
            href="/proveedores"
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
