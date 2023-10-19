import getSession from '@/libs/session';
import Tarjetas from '@/components/Graficas/Tarjetas';
import Area from '@/components/Graficas/Area';
import EstadosGrafica from '@/components/Graficas/EstadosGrafica';
import { prisma } from '@/libs/prisma';

const obtenerDatos = async () => {
  const compras = await prisma.compra.findMany({
    select: {
      total: true,
    },
  });

  const ventas = await prisma.venta.findMany({
    select: {
      total: true,
    },
  });

  compras.forEach((compra) => {
    compra.total = Number(compra.total);
  });

  ventas.forEach((venta) => {
    venta.total = Number(venta.total);
  });

  const totalCompras = compras.reduce(
    (total, compra) => total + compra.total,
    0
  );

  const totalVentas = ventas.reduce((total, venta) => total + venta.total, 0);

  return { totalCompras, totalVentas };
};
export default async function Dashboard() {
  const datos = await obtenerDatos();
  return (
    <div>
      panel de control
      {/* {session && (
        <>
          <h1>Bienvenido {session.nombre}</h1>
          <p>Correo: {session.email}</p>
          <h3>Con el Rol: {session.id_rol} </h3>
        </>
      )} */}
      <Tarjetas informacion={datos} />
      <br />
      <Area />
      <br />
      <EstadosGrafica />
    </div>
  );
}
