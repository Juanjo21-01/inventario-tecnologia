import TablaContenido from './TablaContenido';

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
          <TablaContenido key={index} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
