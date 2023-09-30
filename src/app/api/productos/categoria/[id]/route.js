import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  // Obtenemos una categoria de la base de datos
  const categoria = await prisma.categoriaProductos.findUnique({
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
          id_proveedor: true,
          id_estado: true,
        },
      },
    },
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(categoria);
}

export async function PUT(req, { params: { id } }) {
  const { nombre, descripcion } = await req.json();

  // Actualizamos una categoria de la base de datos
  const categoriaActualizada = await prisma.categoriaProductos.update({
    where: {
      id: Number(id),
    },
    data: {
      nombre,
      descripcion,
    },
  });

  return NextResponse.json(categoriaActualizada);
}

export async function DELETE(req, { params: { id } }) {
  // Eliminamos una categoria de la base de datos
  try {
    const categoriaEliminada = await prisma.categoriaProductos.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(categoriaEliminada);
  } catch (error) {
    return NextResponse.error({
      status: 404,
      message: 'No se encontró el categoria',
    });
  }
}
