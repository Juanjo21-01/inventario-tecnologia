const TablaEncabezado = ({ thead }) => {
  // Quitar el prefijo 'id' si existe en cada palabra
  thead = thead.map((item) => {
    if (item.startsWith('id')) return item.slice(3);
    return item;
  });

  // convertir la primera letra de cada palabra a mayuscula y el resto a minuscula
  thead = thead.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

  return (
    <thead className="bg-teal-400 text-xl text-zinc-50 py-1">
      <tr className="flex flex-row items-center justify-around">
        {thead.map((item, index) =>
          index !== 0 ? <th key={index}>{item}</th> : null
        )}

        <th>Acciones</th>
      </tr>
    </thead>
  );
};

export default TablaEncabezado;
