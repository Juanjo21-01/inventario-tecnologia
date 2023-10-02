import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerEstados = async () =>
  prisma.estado.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
    },
  });

export default async function paginaEstados() {
  const estados = await obtenerEstados();

  // listado de estados para la tabla
  const encabezado = estados.length > 0 ? Object.keys(estados[0]) : [];

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

  const pathname = '/estados';


  return (
    <div>
      <Link href="/productos">Productos</Link>

      <h2>Estados</h2>

      <Formulario campos={campos} pathname={pathname} />

      <Tabla thead={encabezado} tbody={estados} />
    </div>
  );
}
