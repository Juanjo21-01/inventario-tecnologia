import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerCategorias = async () =>
  await prisma.categoriaProductos.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
    },
  });

export default async function categoriaProductos() {
  const categorias = await obtenerCategorias();

  // listado de categoria de productos para la tabla
  const encabezado = categorias.length > 0 ? Object.keys(categorias[0]) : [];

  const campos = {
    nombre: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    descripcion: {
      etiqueta: 'textarea',
      type: 'text',
      value: '',
    },
  };

  const pathname = '/productos/categoria';

  return (
    <>
      <h1 className="text-indigo-500 text-5xl font-bold text-center mb-3">
        Categorias de los Productos
      </h1>

      <Link
        className="text-2xl bg-teal-400 hover:bg-teal-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
        href="/productos"
      >
        Productos
      </Link>

      <Formulario campos={campos} pathname={pathname} />

      <Tabla thead={encabezado} tbody={categorias} />
    </>
  );
}
