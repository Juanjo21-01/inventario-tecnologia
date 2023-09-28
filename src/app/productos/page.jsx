import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerProductos = async () => prisma.producto.findMany();
const obtenerCategorias = async () =>
  prisma.categoriaProductos.findMany({ select: { id: true, nombre: true } });
const obtenerProveedores = async () =>
  prisma.proveedor.findMany({ select: { id: true, nombre: true } });
const obtenerEstados = async () =>
  prisma.estado.findMany({ select: { id: true, nombre: true } });

export default async function paginaProductos() {
  const productos = await obtenerProductos();
  const categorias = await obtenerCategorias();
  const proveedores = await obtenerProveedores();
  const estados = await obtenerEstados();

  // quitar datos innecesarios
  productos.forEach((producto) => {
    producto.precio = `$${producto.precio}`;
    delete producto.descripcion;
    delete producto.codigo_SKU;
    delete producto.createdAt;
    delete producto.updatedAt;
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

  return (
    <div>
      <Link href="productos/categoria">Categorias</Link>
      <h2>Listado de Productos</h2>

      <Formulario campos={campos} />

      <Tabla
        thead={encabezado}
        tbody={productos}
        nombresRelaciones={nombresRelaciones}
      />
    </div>
  );
}
