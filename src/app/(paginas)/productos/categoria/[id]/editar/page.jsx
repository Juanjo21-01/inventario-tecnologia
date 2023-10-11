import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';

const obtenerCategoria = async (id) =>
  prisma.categoriaProductos.findUnique({
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
      <h1>Editar Categoria No. {id}</h1>

      <Formulario
        id={id}
        campos={campos}
        datosActualizar={data}
        pathname={pathname}
      />
    </>
  );
}
