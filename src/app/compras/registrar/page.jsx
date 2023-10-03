import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';

const obtenerProveedores = async () =>
  prisma.proveedor.findMany({ select: { id: true, nombre: true } });
const obtenerProductos = async () =>
  prisma.producto.findMany({ select: { id: true, nombre: true } });

export default async function registrarCompra() {
  const proveedores = await obtenerProveedores();
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
    impuesto: {
      etiqueta: 'input',
      type: 'number',
      value: 0,
    },
    motivo: {
      etiqueta: 'textarea',
      type: 'text',
      value: '',
    },
    id_proveedor: {
      etiqueta: 'select',
      informacion: proveedores,
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

  const pathname = '/compras';

  return (
    <div>
      <h1>Registrar Compra</h1>

      <Formulario campos={campos} pathname={pathname} detalle={true} />
    </div>
  );
}
