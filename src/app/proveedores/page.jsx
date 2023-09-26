import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';

export default function paginaProveedores() {
  // listado de proveedores para la tabla
  const encabezado = ['ID', 'Nombre', 'Direccion', 'Acciones'];
  const contenido = [
    {
      id: 1,
      nombre: 'Proveedor 1',
      direccion: 'Direccion 1',
    },
    {
      id: 2,
      nombre: 'Proveedor 2',
      direccion: 'Direccion 2',
    },
    {
      id: 3,
      nombre: 'Proveedor 3',
      direccion: 'Direccion 3',
    },
  ];

  const campos = {
    nombre: '',
    direccion: '',
  };

  return (
    <div>
      <h2>Listado de Proveedores</h2>

      <Formulario campos={campos} />

      <Tabla thead={encabezado} tbody={contenido} />
    </div>
  );
}
