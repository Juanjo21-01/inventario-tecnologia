import Link from 'next/link';

const Navegacion = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', flex: '1' }}>
      <Link href="/">Inicio</Link>
      <Link href="/productos">Productos</Link>
      <Link href="/compras">Compras</Link>
      <Link href="/ventas">Ventas</Link>
      <Link href="/proveedores">Proveedores</Link>
      <Link href="/usuarios">Usuarios</Link>
    </nav>
  );
};

export default Navegacion;
