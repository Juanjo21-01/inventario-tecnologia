import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  try {
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

    // Si no se encuentra la venta, devolvemos un error
    if (!venta)
      return NextResponse.json(
        {
          message: 'No se encontró la venta',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(venta);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener la venta',
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  try {
    // Eliminamos una venta de la base de datos
    const ventaEliminada = await prisma.venta.delete({
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra la venta, devolvemos un error
    if (!ventaEliminada)
      return NextResponse.json(
        {
          message: 'No se encontró la venta',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(ventaEliminada);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al eliminar la venta',
      },
      {
        status: 400,
      }
    );
  }
}
