import Link from 'next/link';
import ButtonSignOut from './ButtonSignOut';
import getSession from '@/libs/session';

const Navegacion = async () => {
  const session = await getSession();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', flex: '1' }}>
      <Link href="/dashboard">Inicio</Link>
      <Link href="/productos">Productos</Link>
      <Link href="/compras">Compras</Link>
      <Link href="/ventas">Ventas</Link>
      <Link href="/proveedores">Proveedores</Link>
      {session && (
        <>{session.id_rol !== 3 && <Link href="/usuarios">Usuarios</Link>}</>
      )}

      <ButtonSignOut />
    </nav>
  );
};

export default Navegacion;
