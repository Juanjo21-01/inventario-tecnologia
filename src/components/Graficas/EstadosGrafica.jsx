'use client';

import { BarList, Card, Title, Bold, Flex, Text } from '@tremor/react';

const EstadosGrafica = ({ informacion }) => {
  const data = informacion.map((estado) => ({
    name: estado.name,
    value: estado.value,
    icon: function EstadosIcon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2.5 fill-slate-500"
          width="20"
          height="20"
          viewBox="0 0 48 48"
        >
          <path
            fill="#4caf50"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
          ></path>
          <path
            fill="#ccff90"
            d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
          ></path>
        </svg>
      );
    },
  }));

  return (
    <Card className="max-w-lg">
      <Title>Estados</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Nombre</Bold>
        </Text>
        <Text>
          <Bold>Cantidad</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </Card>
  );
};

export default EstadosGrafica;
