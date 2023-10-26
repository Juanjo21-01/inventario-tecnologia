'use client';

import { Card, Grid, Flex, Metric, ProgressBar, Text } from '@tremor/react';

const Tarjetas = ({ informacion }) => {
  let compras = informacion.totalCompras || 0;
  let ventas = informacion.totalVentas || 0;

  let ganancia = ventas - compras;

  const progresoCompras = (compras * 100) / 50000;
  const progresoVentas = (ventas * 100) / 100000;
  const progresoGanancias = (ganancia * 100) / 150000;

  ganancia = `Q. ${ganancia.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  compras = `Q. ${compras.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  ventas = `Q. ${ventas.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  const datos = [
    {
      title: 'Compras',
      metric: `${compras}`,
      progress: progresoCompras,
      target: 'Q. 50,000',
    },
    {
      title: 'Ventas',
      metric: `${ventas}`,
      progress: progresoVentas,
      target: 'Q. 100,000',
    },
    {
      title: 'Ganancias',
      metric: `${ganancia}`,
      progress: progresoGanancias,
      target: 'Q. 150,000',
    },
  ];

  return (
    <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mb-5">
      {datos.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="start">
            <div className="truncate">
              <Text>{item.title}</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
            <Text className="truncate">{item.target}</Text>
          </Flex>
          <ProgressBar value={item.progress} className="mt-2" />
        </Card>
      ))}
    </Grid>
  );
};

export default Tarjetas;
