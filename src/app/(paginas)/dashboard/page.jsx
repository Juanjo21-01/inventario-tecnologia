import getSession from '@/libs/session';
import Tarjetas from '@/components/Graficas/Tarjetas';
import Area from '@/components/Graficas/Area';
import {
  obtenerDatos,
  obtenerFechas,
  obtenerStockProductos,
} from '@/libs/graficas';
import Mensajes from '@/components/Mensajes';

export default async function Dashboard() {
  const datos = await obtenerDatos();
  const session = await getSession();
  const fechas = await obtenerFechas();
  const stock = await obtenerStockProductos();

  return (
    <>
      <h1 className="text-5xl font-bold text-center text-indigo-500">
        Panel de Control
      </h1>

      {session && (
        <section className=" border rounded-xl m-5 p-2">
          <h2 className="font-bold text-3xl">Bienvenido {session.nombre}</h2>
          <p className="text-2xl">Correo: {session.email}</p>
          <h3 className="text-xl">Con el Rol: {session.id_rol} </h3>
        </section>
      )}
      <Tarjetas informacion={datos} />
      <Area informacion={fechas} />

      <Mensajes informacion={stock} />
    </>
  );
}
