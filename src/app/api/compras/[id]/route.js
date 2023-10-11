import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  try {
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

    // Si no se encuentra la compra, devolvemos un error
    if (!compra)
      return NextResponse.json(
        {
          message: 'No se encontró la compra',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(compra);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener la compra' },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  try {
    // Eliminamos una compra de la base de datos
    const compraEliminada = await prisma.compra.delete({
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra la compra, devolvemos un error
    if (!compraEliminada)
      return NextResponse.json(
        {
          message: 'No se encontró la compra',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(compraEliminada);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al eliminar la compra' },
      { status: 400 }
    );
  }
}
