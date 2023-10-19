import { prisma } from '@/libs/prisma';

export const obtenerDatos = async () => {
  const compras = await prisma.compra.findMany({
    select: {
      total: true,
    },
  });

  const ventas = await prisma.venta.findMany({
    select: {
      total: true,
    },
  });

  compras.forEach((compra) => {
    compra.total = Number(compra.total);
  });

  ventas.forEach((venta) => {
    venta.total = Number(venta.total);
  });

  const totalCompras = compras.reduce(
    (total, compra) => total + compra.total,
    0
  );

  const totalVentas = ventas.reduce((total, venta) => total + venta.total, 0);

  return { totalCompras, totalVentas };
};

export const obtenerFechas = async () => {
  // total de compras por mes
  const compras = await prisma.compra.findMany({
    select: {
      fecha: true,
      total: true,
    },
  });

  const ventas = await prisma.venta.findMany({
    select: {
      fecha: true,
      total: true,
    },
  });

  compras.forEach((compra) => {
    compra.total = Number(compra.total);
  });

  ventas.forEach((venta) => {
    venta.total = Number(venta.total);
  });

  const datos = [
    {
      Fecha: 'Enero',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Febrero',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Marzo',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Abril',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Mayo',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Junio',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Julio',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Agosto',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Septiembre',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Octubre',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Noviembre',
      Compras: 0,
      Ventas: 0,
    },
    {
      Fecha: 'Diciembre',
      Compras: 0,
      Ventas: 0,
    },
  ];

  compras.forEach((compra) => {
    const fecha = new Date(compra.fecha);
    const mes = fecha.getMonth();
    datos[mes].Compras += compra.total;
  });

  ventas.forEach((venta) => {
    const fecha = new Date(venta.fecha);
    const mes = fecha.getMonth();
    datos[mes].Ventas += venta.total;
  });

  return datos;
};

export const obtenerEstados = async () => {
  const estados = await prisma.estado.findMany({
    select: {
      nombre: true,
      _count: true,
    },
  });

  const datos = [];

  estados.forEach((estado) => {
    datos.push({
      name: estado.nombre,
      value:
        estado._count.Producto + estado._count.Compra + estado._count.Venta,
    });
  });

  return datos;
};

export const obtenerStockProductos = async () =>
  await prisma.producto.findMany({
    select: {
      nombre: true,
      stock: true,
    },
  });
