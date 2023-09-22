'use client';

import { useRouter, usePathname } from 'next/navigation';

const TablaContenido = ({ item }) => {
  const { push } = useRouter();
  const nombreURL = usePathname();

  const verContenido = () => {
    push(`${nombreURL}/${item.id}`);
  };

  return (
    <tr onClick={verContenido}>
      {Object.keys(item).map((llave, indice) => (
        <td key={indice}>{item[llave]}</td>
      ))}
    </tr>
  );
};

export default TablaContenido;
