'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const TablaContenidoFila = ({ item }) => {
  const { push, refresh } = useRouter();
  const nombreURL = usePathname();

  // hook de sesión
  const { data: session } = useSession();

  // Información de cada fila
  const verContenido = () => {
    push(`${nombreURL}/${item.id}`);
  };

  // Editar contenido
  const editarContenido = () => {
    push(`${nombreURL}/${item.id}/editar`);
  };

  // Eliminar contenido
  const eliminarContenido = async () => {
    // si el rol del usuario es diferente a administrador no puede eliminar
    if (session.user.id_rol !== 1) {
      alert('No tiene permisos para eliminar');
      return;
    }

    if (window.confirm('¿Está seguro de eliminar este contenido?')) {
      await fetch(`/api/${nombreURL}/${item.id}`, { method: 'DELETE' });
    }

    refresh();
  };

  return (
    <tr>
      {Object.keys(item).map((llave, indice) => (
        <td key={indice} onClick={verContenido}>
          {item[llave]}
        </td>
      ))}
      <td>
        {/* no mostrar botón de editar y eliminar si es compra o venta */}
        {nombreURL === '/compras' || nombreURL === '/ventas' ? null : (
          <>
            {/* mostrar botones cuando existe la sesión */}
            {session && (
              <>
                {/* si es rol es administrador mostrar los botones */}
                {(session.user.id_rol === 1 || session.user.id_rol === 2) && (
                  <>
                    {session.user.id_rol === 1 && (
                      <button onClick={eliminarContenido}>Eliminar</button>
                    )}
                    <button onClick={editarContenido}>Editar</button>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* no mostrar el bot */}

        <button onClick={verContenido}>Ver</button>
      </td>
    </tr>
  );
};

export default TablaContenidoFila;
