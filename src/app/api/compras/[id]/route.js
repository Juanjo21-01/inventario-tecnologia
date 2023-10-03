import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  // Obtenemos una compra de la base de datos
  const compra = await prisma.compra.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      fecha: true,
      total: true,
      motivo: true,
      impuesto: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
        },
      },
      proveedor: {
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
      DetalleCompra: {
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

  return NextResponse.json(compra);
}

export async function DELETE(req, { params: { id } }) {
  // Eliminamos una compra de la base de datos
  try {
    const compraEliminada = await prisma.compra.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(compraEliminada);
  } catch (error) {
    return NextResponse.error({
      status: 404,
      message: 'No se encontró el compra',
    });
  }
}
