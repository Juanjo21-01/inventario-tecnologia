import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';
import EstadosGrafica from '@/components/Graficas/EstadosGrafica';
import { obtenerEstados as obtener } from '@/libs/graficas';

const obtenerEstados = async () =>
  await prisma.estado.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
    },
  });

export default async function paginaEstados() {
  const estados = await obtenerEstados();
  const estadosGrafica = await obtener();

  // listado de estados para la tabla
  const encabezado = estados.length > 0 ? Object.keys(estados[0]) : [];

  const campos = {
    nombre: {
      etiqueta: 'input',
      type: 'text',
      value: '',
    },
    descripcion: {
      etiqueta: 'textarea',
      type: 'text',
      value: '',
    },
  };

  const pathname = '/estados';

  return (
    <>
      <h1 className="text-indigo-500 text-5xl font-bold text-center mb-3">
        Estados
      </h1>

      <section className="mb-5">
        <Link
          className="text-2xl bg-teal-400 hover:bg-teal-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
          href="/productos"
        >
          Productos
        </Link>
        <Link
          className="text-2xl bg-teal-400 hover:bg-teal-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
          href="/compras"
        >
          Compras
        </Link>
        <Link
          className="text-2xl bg-teal-400 hover:bg-teal-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
          href="/ventas"
        >
          Ventas
        </Link>
      </section>

      <section className="flex flex-row justify-around">
        <article>
          <Formulario campos={campos} pathname={pathname} />
        </article>
        <EstadosGrafica informacion={estadosGrafica} />
      </section>

      <Tabla thead={encabezado} tbody={estados} />
    </>
  );
}
