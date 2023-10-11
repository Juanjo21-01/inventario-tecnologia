import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  try {
    // Obtenemos todas las ventas de la base de datos
    const ventas = await prisma.venta.findMany();

    return NextResponse.json(ventas);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener las ventas',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    let { fecha, total, motivo, id_usuario, id_estado, Detalle } =
      await req.json();

    // Convertimos la fecha a un objeto de tipo Date
    fecha = new Date(fecha);

    // Parsear los datos a enteros
    id_usuario = parseInt(id_usuario);
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

    // Creamos una nueva venta en la base de datos
    const nuevaVenta = await prisma.venta.create({
      data: {
        fecha,
        total,
        motivo,
        usuario: {
          connect: {
            id: 1,
          },
        },
        estado: {
          connect: {
            id: 1,
          },
        },
        DetalleVenta: {
          create: Detalle,
        },
      },
    });

    return NextResponse.json(nuevaVenta);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al crear la venta',
      },
      {
        status: 500,
      }
    );
  }
}
