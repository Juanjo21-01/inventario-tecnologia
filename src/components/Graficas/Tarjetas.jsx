'use client';

import {
  BadgeDelta,
  Card,
  Grid,
  DeltaType,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from '@tremor/react';

const Tarjetas = ({ informacion }) => {
  let ganancia = informacion.totalVentas - informacion.totalCompras;

  const progresoCompras = (informacion.totalCompras * 100) / 50000;
  const progresoVentas = (informacion.totalVentas * 100) / 100000;
  const progresoGanancias = (ganancia * 100) / 150000;

  ganancia = `Q. ${ganancia.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;


    informacion.totalCompras = `Q. ${informacion.totalCompras
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  informacion.totalVentas = `Q. ${informacion.totalVentas
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  const datos = [
    {
      title: 'Compras',
      metric: `${informacion.totalCompras}`,
      progress: progresoCompras,
      target: 'Q. 50,000',
      delta: '13.2%',
      deltaType: 'moderateIncrease',
    },
    {
      title: 'Ventas',
      metric: `${informacion.totalVentas}`,
      progress: progresoVentas,
      target: 'Q. 100,000',
      delta: '23.9%',
      deltaType: 'increase',
    },
    {
      title: 'Ganancias',
      metric: `${ganancia}`,
      progress: progresoGanancias,
      target: 'Q. 150,000',
      delta: '10.1%',
      deltaType: 'moderateDecrease',
    },
  ];

  return (
    <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
      {datos.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="start">
            <div className="truncate">
              <Text>{item.title}</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
            <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
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
