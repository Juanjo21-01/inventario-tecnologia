import getSession from '@/libs/session';
import Tarjetas from '@/components/Graficas/Tarjetas';
import Area from '@/components/Graficas/Area';
import EstadosGrafica from '@/components/Graficas/EstadosGrafica';
import {
  obtenerDatos,
  obtenerFechas,
  obtenerEstados,
  obtenerStockProductos,
} from '@/libs/graficas';

export default async function Dashboard() {
  const datos = await obtenerDatos();
  const session = await getSession();
  const fechas = await obtenerFechas();
  const estados = await obtenerEstados();
  const stock = await obtenerStockProductos();

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-indigo-500">
        Panel de Control
      </h2>

      {session && (
        <>
          <h1>Bienvenido {session.nombre}</h1>
          <p>Correo: {session.email}</p>
          <h3>Con el Rol: {session.id_rol} </h3>
        </>
      )}
      <Tarjetas informacion={datos} />
      <br />
      <Area informacion={fechas} />
      <br />
      <EstadosGrafica informacion={estados} />
      <br />
    </div>
  );
}
