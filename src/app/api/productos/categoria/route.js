import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  try {
    // Obtenemos todas las categorias de la base de datos
    const categorias = await prisma.categoriaProductos.findMany();

    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener las categorias de los productos',
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

    // Creamos una nueva categoria en la base de datos
    const nuevaCategoria = await prisma.categoriaProductos.create({
      data: {
        nombre,
        descripcion,
      },
    });

    return NextResponse.json(nuevaCategoria);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al crear la categoria del producto',
      },
      {
        status: 500,
      }
    );
  }
}
