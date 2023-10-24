import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const getUsuario = async (id) => {
  const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
  const data = await response.json();
  return data;
};

export default async function usuario({ params: { id } }) {
  const usuario = await getUsuario(id);
  const rol = usuario.rol.nombre;
  const ventas = usuario.Venta;
  const compras = usuario.Compra;

  const encabezadoVentas = ventas.length > 0 ? Object.keys(ventas[0]) : [];
  const encabezadoCompras = compras.length > 0 ? Object.keys(compras[0]) : [];

  const session = await getSession();

  return (
    <div>
      {session.id_rol !== 3 ? (
        <>
          {!usuario.message ? (
            <>
              <h1> {usuario.nombre} </h1>
              <p>Correo Electrónico: {usuario.email}</p>
              <p>Fecha de Creación: {usuario.createdAt}</p>
              <h3>Rol: {rol}</h3>

              <h2>Ventas</h2>
              <Tabla thead={encabezadoVentas} tbody={ventas} />

              <h2>Compras</h2>
              <Tabla thead={encabezadoCompras} tbody={compras} />
            </>
          ) : (
            <h1>{usuario.message}</h1>
          )}
          <Link href="/usuarios">Volver a Usuarios</Link>
        </>
      ) : (
        <AccesoDenegado />
      )}
    </div>
  );
}
