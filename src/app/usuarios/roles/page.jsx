import Tabla from '@/components/Tabla/Tabla';

export default function roles() {
  // listado de roles para la tabla
  const encabezado = ['ID', 'Nombre', 'Acciones'];
  const contenido = [
    {
      id: 1,
      nombre: 'Rol 1',
    },
    {
      id: 2,
      nombre: 'Rol 2',
    },
  ];
  return (
    <div>
      roles de los usuarios
      <Tabla thead={encabezado} tbody={contenido} />
    </div>
  );
}
