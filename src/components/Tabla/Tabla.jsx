import TablaEncabezado from './TablaEncabezado';
import TablaContenido from './TablaContenido';

const Tabla = ({ thead, tbody, nombresRelaciones }) => {
  return (
    <table style={{ border: '2px solid red', margin: '2rem' }}>
      <TablaEncabezado thead={thead} />

      <TablaContenido tbody={tbody} nombresRelaciones={nombresRelaciones} />
    </table>
  );
};

export default Tabla;
