import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';

export default function paginaUsuarios() {
  // listado de usuarios para la tabla
  const encabezado = ['ID', 'Nombre', 'email', 'Acciones'];
  const contenido = [
    {
      id: 1,
      nombre: 'Usuario 1',
      email: 'ejemplo1@ejemplo.com',
    },
    {
      id: 2,
      nombre: 'Usuario 2',
      email: 'ejemplo2@ejemplo.com',
    },
  ];

  const campos = {
    nombre: '',
    email: '',
  };

  return (
    <div>
      <Link href="usuarios/roles">Roles</Link>
      <h2>pagina con los usuarios registrados</h2>

      <Formulario campos={campos} />

      <Tabla thead={encabezado} tbody={contenido} />
    </div>
  );
}
