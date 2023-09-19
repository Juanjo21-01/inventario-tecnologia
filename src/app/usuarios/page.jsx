import Link from 'next/link';

export default function paginaUsuarios() {
  return (
    <div>
      <Link href="usuarios/roles">Roles</Link>
      <h2>pagina con los usuarios registrados</h2>
    </div>
  );
}
