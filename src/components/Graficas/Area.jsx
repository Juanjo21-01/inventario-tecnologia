'use client';

import { Card, Title, AreaChart } from '@tremor/react';

const Area = ({ informacion }) => {
  const chartdata = informacion.map((item) => ({
    Fecha: item.Fecha,
    Compras: item.Compras,
    Ventas: item.Ventas,
  }));

  const valueFormatter = (number) =>
    `Q ${new Intl.NumberFormat('us').format(number).toString()}`;

  return (
    <Card>
      <Title>Ingresos y Gastos por Mes (Quetzales)</Title>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="Fecha"
        categories={['Compras', 'Ventas']}
        colors={['indigo', 'cyan']}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};

export default Area;
