import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerProductos = async () =>
  await prisma.producto.findMany({
    select: {
      id: true,
      nombre: true,
      precio: true,
      stock: true,
      id_categoria: true,
      id_proveedor: true,
      id_estado: true,
    },
  });
const obtenerCategorias = async () =>
  await prisma.categoriaProductos.findMany({
    select: { id: true, nombre: true },
  });
const obtenerProveedores = async () =>
  await prisma.proveedor.findMany({ select: { id: true, nombre: true } });
const obtenerEstados = async () =>
  await prisma.estado.findMany({ select: { id: true, nombre: true } });

export default async function paginaProductos() {
  const productos = await obtenerProductos();
  const categorias = await obtenerCategorias();
  const proveedores = await obtenerProveedores();
  const estados = await obtenerEstados();

  // quitar datos innecesarios
  productos.forEach((producto) => {
    producto.precio = `$${producto.precio}`;
  });

  // listado de productos para la tabla
  const encabezado = productos.length > 0 ? Object.keys(productos[0]) : [];

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

  const nombresRelaciones = {
    id_estado: estados,
    id_proveedor: proveedores,
    id_categoria: categorias,
  };
  const pathname = '/productos';
  return (
    <div>
      <Link href="productos/categoria">Categorias</Link>
      <Link href="estados">Estados</Link>
      <h2>Listado de Productos</h2>

      <Formulario campos={campos} pathname={pathname} />

      <Tabla
        thead={encabezado}
        tbody={productos}
        nombresRelaciones={nombresRelaciones}
      />
    </div>
  );
}
