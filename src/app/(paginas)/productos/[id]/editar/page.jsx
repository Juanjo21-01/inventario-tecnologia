import Formulario from '@/components/Formulario/Formulario';
import { prisma } from '@/libs/prisma';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';
import Link from 'next/link';

const obtenerCategorias = async () =>
  await prisma.categoriaProductos.findMany({
    select: { id: true, nombre: true },
  });
const obtenerProveedores = async () =>
  await prisma.proveedor.findMany({ select: { id: true, nombre: true } });
const obtenerEstados = async () =>
  await prisma.estado.findMany({ select: { id: true, nombre: true } });
const obtenerProducto = async (id) =>
  prisma.producto.findUnique({
    where: { id: Number(id) },
    select: {
      nombre: true,
      codigo_SKU: true,
      precio: true,
      stock: true,
      id_estado: true,
      id_proveedor: true,
      id_categoria: true,
      descripcion: true,
    },
  });

export default async function editarProducto({ params: { id } }) {
  const categorias = await obtenerCategorias();
  const proveedores = await obtenerProveedores();
  const estados = await obtenerEstados();
  let data = await obtenerProducto(id);

  data = {
    ...data,
    precio: Number(data.precio),
  };

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

  const pathname = '/productos';

  const session = await getSession();
  return (
    <>
      {session.id_rol !== 3 ? (
        <>
          <h1 className="text-rose-500 text-4xl font-bold text-center mb-3">
            Editar Producto No. {id}
          </h1>

          <Link
            className="text-xl bg-rose-400 hover:bg-rose-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
            href="/productos"
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
