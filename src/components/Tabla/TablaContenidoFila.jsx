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

    // no permitir al administrador eliminar su propio usuario pero si eliminar a otros usuarios
    if (session.user.id_rol === 1 && nombreURL === '/usuarios') {
      if (session.user.id === item.id) {
        alert('No puede eliminar su propio usuario');
        return;
      }
    }

    if (window.confirm('¿Está seguro de eliminar este contenido?')) {
      await fetch(`/api/${nombreURL}/${item.id}`, { method: 'DELETE' });
    }

    refresh();
  };

  return (
    <tr className="flex flex-row items-center justify-around border-b-2 py-1">
      {Object.keys(item).map((llave, indice) => {
        const contenido = item[llave];

        // Verificar si el contenido es un número de uno o dos dígitos
        const esNumeroDeUnoOdosDigitos = /^(\d{1,2})$/.test(contenido);

        if (esNumeroDeUnoOdosDigitos) {
          return null; // No renderizar nada si es un número de uno o dos dígitos
        } else {
          // Renderizar el elemento <td> si no es un número de uno o dos dígitos
          return (
            <td key={indice} onClick={verContenido}>
              {contenido}
            </td>
          );
        }
      })}
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
                      <button
                        onClick={eliminarContenido}
                        className="p-1 text-zinc-50 transition duration-500 ease-in-out bg-rose-400 rounded-xl hover:bg-rose-500 me-2"
                      >
                        Eliminar
                      </button>
                    )}

                    <button
                      onClick={editarContenido}
                      className="p-1 text-zinc-50 transition duration-500 ease-in-out bg-teal-400 rounded-xl hover:bg-teal-500 me-2"
                    >
                      Editar
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* no mostrar el bot */}

        <button
          onClick={verContenido}
          className="p-1 text-zinc-50 transition duration-500 ease-in-out bg-indigo-400 rounded-xl hover:bg-indigo-500 me-2"
        >
          Ver
        </button>
      </td>
    </tr>
  );
};

export default TablaContenidoFila;
