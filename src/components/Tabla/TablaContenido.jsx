import TablaContenidoFila from './TablaContenidoFila';

const TablaContenido = ({ tbody, nombresRelaciones }) => {
  // Validacion si no hay que reemplazar nada
  if (nombresRelaciones) {
    // Reemplazar en el contenido el id de la relación por el nombre de la relación
    tbody.forEach((item) => {
      Object.keys(item).forEach((llave) => {
        if (nombresRelaciones[llave]) {
          item[llave] = nombresRelaciones[llave].find(
            (relacion) => relacion.id === item[llave]
          ).nombre;
        }
      });
    });
  }

  return (
    <tbody className="text-sm">
      {tbody.map((item, index) => (
        <TablaContenidoFila key={index} item={item} />
      ))}
    </tbody>
  );
};

export default TablaContenido;
