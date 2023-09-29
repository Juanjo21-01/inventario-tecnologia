import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';

const obtenerCategorias = async () =>
  prisma.categoriaProductos.findMany({ select: { id: true, nombre: true } });
const obtenerProveedores = async () =>
  prisma.proveedor.findMany({ select: { id: true, nombre: true } });
const obtenerEstados = async () =>
  prisma.estado.findMany({ select: { id: true, nombre: true } });

export default async function editarProducto({ params: { id } }) {
  const categorias = await obtenerCategorias();
  const proveedores = await obtenerProveedores();
  const estados = await obtenerEstados();
  const campos = {
    nombre: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    codigo_SKU: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    precio: {
      etiqueta: 'input',
      type: 'number',
      value: 0,
    },
    stock: {
      etiqueta: 'input',
      type: 'number',
      value: 0,
    },
    id_estado: {
      etiqueta: 'select',
      type: 'text',
      value: 0,
      informacion: estados,
    },
    id_proveedor: {
      etiqueta: 'select',
      type: 'text',
      value: 0,
      informacion: proveedores,
    },
    id_categoria: {
      etiqueta: 'select',
      type: 'text',
      value: 0,
      informacion: categorias,
    },
    descripcion: {
      etiqueta: 'textarea',
      type: 'text',
      value: '',
    },
  };

  return (
    <>
      <h1>Editar Producto No. {id}</h1>

      <Formulario id={id} campos={campos} />
    </>
  );
}
