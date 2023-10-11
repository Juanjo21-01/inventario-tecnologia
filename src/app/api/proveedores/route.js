import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  try {
    // Obtenemos todos los proveedores de la base de datos
    const proveedores = await prisma.proveedor.findMany();

    return NextResponse.json(proveedores);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener los proveedores',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const { nombre, nit, direccion, telefono, email } = await req.json();

    // Creamos un nuevo proveedor en la base de datos
    const nuevoProducto = await prisma.proveedor.create({
      data: {
        nombre,
        nit,
        direccion,
        telefono,
        email,
      },
    });

    return NextResponse.json(nuevoProducto);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al crear el proveedor',
      },
      {
        status: 500,
      }
    );
  }
}
