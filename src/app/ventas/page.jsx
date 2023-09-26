import Formulario from '@/components/Formulario/Formulario';
import Tabla from '@/components/Tabla/Tabla';
import React from 'react';

export default function paginaVentas() {
  // listado de ventas para la tabla
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

  const campos = {
    fecha: new Date(),
    total: 0,
  };

  return (
    <div>
      <h2>listado de las ventas</h2>

      <Formulario campos={campos} />

      <Tabla thead={encabezado} tbody={contenido} />
    </div>
  );
}
