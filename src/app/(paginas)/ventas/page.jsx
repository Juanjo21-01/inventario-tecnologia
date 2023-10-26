import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerVentas = async () =>
  await prisma.venta.findMany({
    select: {
      id: true,
      fecha: true,
      total: true,
      id_estado: true,
    },
  });
const obtenerEstados = async () =>
  await prisma.estado.findMany({ select: { id: true, nombre: true } });

export default async function paginaVentas() {
  const ventas = await obtenerVentas();
  const estados = await obtenerEstados();

  // pasar fecha a formato local y total a moneda
  ventas.forEach((venta) => {
    venta.fecha = new Date(venta.fecha).toLocaleDateString();
    venta.total = `Q. ${venta.total}`;
  });

  // listado de ventas para la tabla
  const encabezado =
    ventas.length > 0 ? Object.keys(ventas[0]) : ['fecha', 'total', 'estado'];

  const nombresRelaciones = {
    id_estado: estados,
  };

  return (
    <>
      <h1 className="text-indigo-500 text-5xl font-bold text-center mb-4">
        Listado de Ventas
      </h1>

      <Link
        href="/ventas/registrar"
        className="text-2xl bg-teal-400 hover:bg-teal-500 px-2 py-1 rounded-lg text-center text-zinc-50 mx-4"
      >
        Registrar Nueva Venta
      </Link>

      <Tabla
        thead={encabezado}
        tbody={ventas}
        nombresRelaciones={nombresRelaciones}
      />
    </>
  );
}
