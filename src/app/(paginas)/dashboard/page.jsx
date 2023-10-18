import getSession from '@/libs/session';

export default async function Dashboard() {
  const session = await getSession();

  return (
    <div>
      panel de control
      {session && (
        <>
          <h1>Bienvenido {session.nombre}</h1>
          <p>Correo: {session.email}</p>
          <h3>Con el Rol: {session.id_rol} </h3>
        </>
      )}
    </div>
  );
}
