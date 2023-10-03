import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export async function GET() {
  // Obtenemos todas las compras de la base de datos
  const compras = await prisma.compra.findMany();

  return NextResponse.json(compras);
}

export async function POST(req) {
  let {
    fecha,
    total,
    motivo,
    impuesto,
    id_usuario,
    id_proveedor,
    id_estado,
    Detalle,
  } = await req.json();

  // Convertimos la fecha a un objeto de tipo Date
  fecha = new Date(fecha);

  // Parsear los datos a enteros
  impuesto = parseFloat(impuesto);
  id_usuario = parseInt(id_usuario);
  id_proveedor = parseInt(id_proveedor);
  id_estado = parseInt(id_estado);

  // Parsear los datos del detalle de la compra
  Detalle = Detalle.map((detalle) => {
    return {
      cantidad: parseInt(detalle.cantidad),
      precio: parseFloat(detalle.precio),
      producto: {
        connect: {
          id: parseInt(detalle.id_producto),
        },
      },
    };
  });

  // Creamos una nueva compra en la base de datos
  const nuevaCompra = await prisma.compra.create({
    data: {
      fecha,
      total,
      motivo,
      impuesto,
      usuario: {
        connect: {
          id: 1,
        },
      },
      proveedor: {
        connect: {
          id: id_proveedor,
        },
      },
      estado: {
        connect: {
          id: 1,
        },
      },
      DetalleCompra: {
        create: Detalle,
      },
    },
  });

  return NextResponse.json(nuevaCompra);
}
