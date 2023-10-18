import Link from 'next/link';

const AccesoDenegado = () => {
  return (
    <div>
      <h1>Acceso Denegado a la Página</h1>

      <Link href="/dashboard">Volver</Link>
    </div>
  );
};

export default AccesoDenegado;
