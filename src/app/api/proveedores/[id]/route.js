import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  try {
    // Obtenemos un proveedor de la base de datos
    const proveedor = await prisma.proveedor.findUnique({
      select: {
        id: true,
        nombre: true,
        nit: true,
        direccion: true,
        telefono: true,
        email: true,
        createdAt: true,
        Producto: {
          select: {
            id: true,
            nombre: true,
            precio: true,
            stock: true,
            id_categoria: true,
            id_estado: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el proveedor, devolvemos un error
    if (!proveedor)
      return NextResponse.json(
        {
          message: 'No se encontró el proveedor',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(proveedor);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener el proveedor',
      },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req, { params: { id } }) {
  try {
    const { nombre, nit, direccion, telefono, email } = await req.json();

    // Actualizamos un proveedor de la base de datos
    const proveedorActualizado = await prisma.proveedor.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        nit,
        direccion,
        telefono,
        email,
      },
    });

    // Si no se encuentra el proveedor, devolvemos un error
    if (!proveedorActualizado)
      return NextResponse.json(
        {
          message: 'No se encontró el proveedor',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(proveedorActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al actualizar el proveedor',
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  try {
    // Eliminamos un proveedor de la base de datos
    const proveedorEliminado = await prisma.proveedor.delete({
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el proveedor, devolvemos un error
    if (!proveedorEliminado)
      return NextResponse.json(
        {
          message: 'No se encontró el proveedor',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(proveedorEliminado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al eliminar el proveedor',
      },
      {
        status: 400,
      }
    );
  }
}
