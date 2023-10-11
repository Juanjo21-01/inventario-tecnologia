import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  try {
    // Obtenemos todos los estados de la base de datos
    const estados = await prisma.estado.findMany();

    return NextResponse.json(estados);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener los estados',
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

    // Creamos un nuevo estado en la base de datos
    const nuevoEstado = await prisma.estado.create({
      data: {
        nombre,
        descripcion,
      },
    });

    return NextResponse.json(nuevoEstado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al crear el estado',
      },
      {
        status: 500,
      }
    );
  }
}
