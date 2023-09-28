'use client';

import { useRouter, usePathname } from 'next/navigation';

const TablaContenidoFila = ({ item }) => {
  const { push } = useRouter();
  const nombreURL = usePathname();

  const verContenido = () => {
    push(`${nombreURL}/${item.id}`);
  };

  return (
    <tr>
      {Object.keys(item).map((llave, indice) => (
        <td key={indice} onClick={verContenido}>
          {item[llave]}
        </td>
      ))}
      <td>
        <button>Editar</button>
        <button>Eliminar</button>
        <button>Ver</button>
      </td>
    </tr>
  );
};

export default TablaContenidoFila;
