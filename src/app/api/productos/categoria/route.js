import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  // Obtenemos todos las categorias de la base de datos
  const categorias = await prisma.categoriaProductos.findMany();

  return NextResponse.json(categorias);
}

export async function POST(req) {
  const { nombre, descripcion } = await req.json();

  // Creamos una nueva categoria en la base de datos
  const nuevaCategoria = await prisma.categoriaProductos.create({
    data: {
      nombre,
      descripcion,
    },
  });

  return NextResponse.json(nuevaCategoria);
}
