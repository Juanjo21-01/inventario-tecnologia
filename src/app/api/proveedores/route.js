import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  // Obtenemos todos los proveedores de la base de datos
  const proveedores = await prisma.proveedor.findMany();

  return NextResponse.json(proveedores);
}

export async function POST(req) {
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
}
