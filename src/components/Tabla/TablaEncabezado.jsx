const TablaEncabezado = ({ thead }) => {
  // Quitar el prefijo 'id' si existe en cada palabra
  thead = thead.map((item) => {
    if (item.startsWith('id')) return item.slice(3);
    return item;
  });

  // convertir la primera letra de cada palabra a mayuscula y el resto a minuscula
  thead = thead.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

  return (
    <thead>
      <tr>
        {thead.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
        <th>Acciones</th>
      </tr>
    </thead>
  );
};

export default TablaEncabezado;
