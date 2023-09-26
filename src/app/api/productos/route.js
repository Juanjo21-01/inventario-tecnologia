import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  // Obtenemos todos los productos de la base de datos
  const productos = await prisma.producto.findMany();

  return NextResponse.json(productos);
}
