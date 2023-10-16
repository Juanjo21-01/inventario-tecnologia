import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  try {
    // Obtenemos todos los roles de la base de datos
    const roles = await prisma.rol.findMany();

    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener los roles',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const { nombre, descripcion } = await req.json();

    // Creamos un nuevo rol en la base de datos
    const nuevoRol = await prisma.rol.create({
      data: {
        nombre,
        descripcion,
      },
    });

    return NextResponse.json(nuevoRol);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al crear el rol',
      },
      {
        status: 500,
      }
    );
  }
}
