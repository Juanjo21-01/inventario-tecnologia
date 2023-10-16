import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Gestión de Inventarios</h1>

      <h2>Empresa {'"Tecnología en un solo lugar"'}</h2>

      <Link href="/login">Iniciar sesión</Link>
      <Link href="/register">Registrarse</Link>
      <br />

      <Link href="/dashboard">Inicio</Link>
    </>
  );
}
