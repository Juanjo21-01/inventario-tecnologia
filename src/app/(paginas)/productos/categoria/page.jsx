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
    <div className='mt-5'>
      <Link className='rounded-full text-white py-[14px] px-[40px] bg-[#35cdce] 'href="/productos">Productos</Link>
      <h2 className='text-[#122e40] text-[32px] my-4'>Categoria de Productos</h2>

      <Formulario campos={campos} pathname={pathname} />

      <Tabla thead={encabezado} tbody={categorias} />
    </div>
  );
}
