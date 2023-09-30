import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
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

  return NextResponse.json(proveedor);
}

export async function PUT(req, { params: { id } }) {
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

  return NextResponse.json(proveedorActualizado);
}

export async function DELETE(req, { params: { id } }) {
  // Eliminamos un proveedor de la base de datos
  try {
    const proveedorEliminado = await prisma.proveedor.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(proveedorEliminado);
  } catch (error) {
    return NextResponse.error({
      status: 404,
      message: 'No se encontró el proveedor',
    });
  }
}
