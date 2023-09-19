import Link from 'next/link';

export default function paginaProductos() {
  return (
    <div>
      <Link href="productos/categoria">Categorias</Link>
      <h2>Listado de Productos</h2>
    </div>
  );
}
