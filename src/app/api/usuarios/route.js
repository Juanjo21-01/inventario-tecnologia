import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  try {
    // Obtenemos todos los usuarios de la base de datos
    const usuarios = await prisma.usuario.findMany();

    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener los usuarios',
      },
      {
        status: 500,
      }
    );
  }
}
