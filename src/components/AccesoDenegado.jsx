import Link from 'next/link';

const AccesoDenegado = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-5xl font-bold text-center text-green-800">
        Acceso Denegado a la Página
      </h1>

      <Link
        href="/dashboard"
        className="px-4 py-2 my-5 text-center text-white bg-indigo-400 rounded-xl hover:bg-indigo-500"
      >
        Volver
      </Link>
    </section>
  );
};

export default AccesoDenegado;
