import TablaEncabezado from './TablaEncabezado';
import TablaContenido from './TablaContenido';

const Tabla = ({ thead, tbody, nombresRelaciones }) => {
  return (
    <>
      {tbody.length > 0 ? (
        <table style={{ border: '2px solid red', margin: '2rem' }}>
          <TablaEncabezado thead={thead} />

          <TablaContenido tbody={tbody} nombresRelaciones={nombresRelaciones} />
        </table>
      ) : (
        <p className="text-4xl font-bold text-center text-teal-600">
          No hay elementos
        </p>
      )}
    </>
  );
};

export default Tabla;
