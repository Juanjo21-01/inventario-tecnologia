const Tabla = ({ thead, tbody }) => {
  return (
    <table>
      <thead>
        <tr>
          {thead.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbody.map((item, index) => (
          <tr key={index}>
            {Object.keys(item).map((llave, indice) => (
              <td key={indice}>{item[llave]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
