import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  try {
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
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra la categoria, devolvemos un error
    if (!categoria)
      return NextResponse.json(
        {
          message: 'No se encontró la categoria',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(categoria);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener la categoria',
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

    // Si no se encuentra la categoria, devolvemos un error
    if (!categoriaActualizada)
      return NextResponse.json(
        {
          message: 'No se encontró la categoria',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(categoriaActualizada);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al actualizar la categoria',
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  // Eliminamos una categoria de la base de datos
  try {
    const categoriaEliminada = await prisma.categoriaProductos.delete({
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra la categoria, devolvemos un error
    if (!categoriaEliminada)
      return NextResponse.json(
        {
          message: 'No se encontró la categoria',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(categoriaEliminada);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al eliminar la categoria',
      },
      {
        status: 400,
      }
    );
  }
}
