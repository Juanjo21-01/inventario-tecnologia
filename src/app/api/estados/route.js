import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  // Obtenemos todos los estados de la base de datos
  const estados = await prisma.estado.findMany();

  return NextResponse.json(estados);
}

export async function POST(req) {
  const { nombre, descripcion } = await req.json();

  // Creamos un nuevo estado en la base de datos
  const nuevoEstado = await prisma.estado.create({
    data: {
      nombre,
      descripcion,
    },
  });

  return NextResponse.json(nuevoEstado);
}
