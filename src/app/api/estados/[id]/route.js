import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
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

  return NextResponse.json(estado);
}

export async function PUT(req, { params: { id } }) {
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

  return NextResponse.json(estadoActualizado);
}

export async function DELETE(req, { params: { id } }) {
  // Eliminamos un estado de la base de datos
  try {
    const estadoEliminado = await prisma.estado.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(estadoEliminado);
  } catch (error) {
    return NextResponse.error({
      status: 404,
      message: 'No se encontró el estado',
    });
  }
}
