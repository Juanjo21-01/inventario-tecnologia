import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';

export default function categoriaProductos() {
  // listado de categoria de productos para la tabla
  const encabezado = ['ID', 'Nombre', 'Acciones'];
  const contenido = [
    {
      id: 1,
      nombre: 'Categoria 1',
    },
    {
      id: 2,
      nombre: 'Categoria 2',
    },
  ];
  return (
    <div>
      <Link href="productos">Productos</Link>
      <h2>Categoria de Productos</h2>
      <Tabla thead={encabezado} tbody={contenido} />
    </div>
  );
}
