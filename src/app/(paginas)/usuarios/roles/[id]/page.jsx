import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import getSession from '@/libs/session';
import AccesoDenegado from '@/components/AccesoDenegado';

const getRol = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/usuarios/roles/${id}`
  );
  const data = await response.json();
  return data;
};

export default async function rol({ params: { id } }) {
  const rol = await getRol(id);
  const session = await getSession();

  const usuarios = rol.Usuario || [];

  const encabezadoUsuarios =
    usuarios.length > 0 ? Object.keys(usuarios[0]) : [];

  return (
    <div>
      {session.id_rol !== 3 ? (
        <>
          {!rol.message ? (
            <>
              <h1>{rol.nombre}</h1>

              <p>Descripción: {rol.descripcion}</p>
              <p>Fecha de Creación: {rol.createdAt}</p>

              <h2>Usuarios</h2>
              <Tabla thead={encabezadoUsuarios} tbody={usuarios} />
            </>
          ) : (
            <>
              <h1>{rol.message}</h1>
            </>
          )}
          <Link href="/usuarios/roles">Volver a Roles</Link>
        </>
      ) : (
        <AccesoDenegado />
      )}
    </div>
  );
}
