import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerVentas = async () =>
  prisma.venta.findMany({
    select: {
      id: true,
      fecha: true,
      total: true,
      id_estado: true,
    },
  });
const obtenerEstados = async () =>
  prisma.estado.findMany({ select: { id: true, nombre: true } });

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
    <div>
      <h2>listado de Ventas</h2>

      <Link href="/ventas/registrar">Registrar Nueva Venta</Link>

      <Tabla
        thead={encabezado}
        tbody={ventas}
        nombresRelaciones={nombresRelaciones}
      />
    </div>
  );
}
