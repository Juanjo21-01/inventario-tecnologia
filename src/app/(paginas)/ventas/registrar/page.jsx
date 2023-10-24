import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';

const obtenerProductos = async () =>
  await prisma.producto.findMany({ select: { id: true, nombre: true } });

export default async function registrarVenta() {
  const productos = await obtenerProductos();

  const campos = {
    fecha: {
      etiqueta: 'input',
      type: 'date',
      value: '',
    },
    cantidad: {
      etiqueta: 'input',
      type: 'number',
      value: 0,
    },
    precio: {
      etiqueta: 'input',
      type: 'number',
      value: 0,
    },
    motivo: {
      etiqueta: 'textarea',
      type: 'text',
      value: '',
    },
    id_producto: {
      etiqueta: 'select',
      informacion: productos,
      value: '',
    },
    total: {
      etiqueta: 'input',
      type: 'hidden',
      value: 0,
    },
    Detalle: {
      etiqueta: 'input',
      type: 'hidden',
      value: [],
    },
  };

  const pathname = '/ventas';

  return (
    <div>
      <h1 className='text-[#122e40] text-[32px] my-4'>Registrar Venta</h1>

      <Formulario campos={campos} pathname={pathname} detalle={true} />
    </div>
  );
}
