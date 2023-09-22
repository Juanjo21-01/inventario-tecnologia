import Tabla from '@/components/Tabla/Tabla';

export default function paginaCompras() {
  // listado de compras para la tabla
  const encabezado = ['ID', 'Fecha', 'Total', 'Acciones'];
  const contenido = [
    {
      id: 1,
      fecha: '2021-09-01',
      total: 100,
    },
    {
      id: 2,
      fecha: '2021-09-02',
      total: 200,
    },
  ];

  return (
    <div>
      <h2>listado de las compras</h2>

      <Tabla thead={encabezado} tbody={contenido} />
    </div>
  );
}
