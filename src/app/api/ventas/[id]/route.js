import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  // Obtenemos una venta de la base de datos
  const venta = await prisma.venta.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      fecha: true,
      total: true,
      motivo: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
        },
      },
      estado: {
        select: {
          id: true,
          nombre: true,
        },
      },
      DetalleVenta: {
        select: {
          id: true,
          cantidad: true,
          precio: true,
          producto: {
            select: {
              id: true,
              nombre: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(venta);
}

export async function DELETE(req, { params: { id } }) {
  // Eliminamos una venta de la base de datos
  try {
    const ventaEliminada = await prisma.venta.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(ventaEliminada);
  } catch (error) {
    return NextResponse.error({
      status: 404,
      message: 'No se encontró el venta',
    });
  }
}
