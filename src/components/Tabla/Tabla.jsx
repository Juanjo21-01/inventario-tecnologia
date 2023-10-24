import TablaEncabezado from './TablaEncabezado';
import TablaContenido from './TablaContenido';

const Tabla = ({ thead, tbody, nombresRelaciones }) => {
  return (
    <table className='bg-[#fffffe] rounded-xl mt-20 flex flex-col'>
      <TablaEncabezado thead={thead} />

      <TablaContenido tbody={tbody} nombresRelaciones={nombresRelaciones} />
    </table>
  );
};

export default Tabla;
