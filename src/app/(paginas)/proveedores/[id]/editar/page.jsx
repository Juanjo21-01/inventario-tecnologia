import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const obtenerProveedores = async (id) =>
  prisma.proveedor.findUnique({
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
    <div>
      {session.id_rol !== 3 ? (
        <>
          <h1>Editar Proveedor No. {id}</h1>
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
