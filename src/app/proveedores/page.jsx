import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import { prisma } from '@/libs/prisma';

const obtenerProveedores = async () =>
  prisma.proveedor.findMany({
    select: {
      id: true,
      nombre: true,
      nit: true,
      email: true,
      telefono: true,
      direccion: true,
    },
  });

export default async function paginaProveedores() {
  const proveedores = await obtenerProveedores();
  
  // listado de proveedores para la tabla
  const encabezado = proveedores.length > 0 ? Object.keys(proveedores[0]) : [];

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
      type: 'tel',
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
      <h2>Listado de Proveedores</h2>

      <Formulario campos={campos} pathname={pathname} />

      <Tabla thead={encabezado} tbody={proveedores} />
    </div>
  );
}
