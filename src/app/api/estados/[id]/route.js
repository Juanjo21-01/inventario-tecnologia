import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  try {
    // Obtenemos un estado de la base de datos
    const estado = await prisma.estado.findUnique({
      select: {
        nombre: true,
        descripcion: true,
        createdAt: true,
        Producto: {
          select: {
            id: true,
            nombre: true,
            precio: true,
            stock: true,
          },
        },
        Compra: {
          select: {
            id: true,
            fecha: true,
            total: true,
          },
        },
        Venta: {
          select: {
            id: true,
            fecha: true,
            total: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el estado, devolvemos un error
    if (!estado)
      return NextResponse.json(
        {
          message: 'No se encontró el estado',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(estado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener el estado',
      },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req, { params: { id } }) {
  try {
    const { nombre, descripcion } = await req.json();

    // Actualizamos un estado de la base de datos
    const estadoActualizado = await prisma.estado.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        descripcion,
      },
    });

    // Si no se encuentra el estado, devolvemos un error
    if (!estadoActualizado)
      return NextResponse.json(
        {
          message: 'No se encontró el estado',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(estadoActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al actualizar el estado',
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  try {
    // Eliminamos un estado de la base de datos
    const estadoEliminado = await prisma.estado.delete({
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el estado, devolvemos un error
    if (!estadoEliminado)
      return NextResponse.json(
        {
          message: 'No se encontró el estado',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(estadoEliminado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al eliminar el estado',
      },
      {
        status: 400,
      }
    );
  }
}
