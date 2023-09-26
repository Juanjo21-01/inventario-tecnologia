import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';

export default function paginaProductos() {
  // listado de productos para la tabla
  const encabezado = ['ID', 'Nombre', 'Precio', 'Existencia', 'Acciones'];
  const contenido = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 100,
      existencia: 10,
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 200,
      existencia: 20,
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 300,
      existencia: 30,
    },
  ];

  const campos = {
    nombre: '',
    precio: 0,
    existencia: 0,
    boleano: false,
  };

  return (
    <div>
      <Link href="productos/categoria">Categorias</Link>
      <h2>Listado de Productos</h2>

      <Formulario campos={campos} />

      <Tabla thead={encabezado} tbody={contenido} />
    </div>
  );
}
