import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  try {
    // Obtenemos un rol de la base de datos
    const rol = await prisma.rol.findUnique({
      select: {
        nombre: true,
        descripcion: true,
        createdAt: true,
        Usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el rol, devolvemos un error
    if (!rol)
      return NextResponse.json(
        {
          message: 'No se encontró el rol',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(rol);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener el rol',
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

    // Actualizamos un rol de la base de datos
    const rolActualizado = await prisma.rol.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        descripcion,
      },
    });

    // Si no se encuentra el rol, devolvemos un error
    if (!rolActualizado)
      return NextResponse.json(
        {
          message: 'No se encontró el rol',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(rolActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al actualizar el rol',
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  try {
    // Eliminamos un rol de la base de datos
    const rolEliminado = await prisma.rol.delete({
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el rol, devolvemos un error
    if (!rolEliminado)
      return NextResponse.json(
        {
          message: 'No se encontró el rol',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(rolEliminado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al eliminar el rol',
      },
      {
        status: 400,
      }
    );
  }
}
