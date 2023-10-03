'use client';

import { useRouter, usePathname } from 'next/navigation';

const TablaContenidoFila = ({ item }) => {
  const { push, refresh } = useRouter();
  const nombreURL = usePathname();

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
            <button onClick={editarContenido}>Editar</button>
            <button onClick={eliminarContenido}>Eliminar</button>
          </>
        )}

        <button onClick={verContenido}>Ver</button>
      </td>
    </tr>
  );
};

export default TablaContenidoFila;
