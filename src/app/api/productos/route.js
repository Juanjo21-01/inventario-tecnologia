import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
  try {
    // Obtenemos todos los productos de la base de datos
    const productos = await prisma.producto.findMany();

    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener los productos',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    let {
      nombre,
      descripcion,
      codigo_SKU,
      precio,
      stock,
      id_estado,
      id_proveedor,
      id_categoria,
    } = await req.json();

    // Parsear los datos a enteros
    precio = parseInt(precio);
    stock = parseInt(stock);
    id_estado = parseInt(id_estado);
    id_proveedor = parseInt(id_proveedor);
    id_categoria = parseInt(id_categoria);

    // Creamos un nuevo producto en la base de datos
    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        codigo_SKU,
        precio,
        stock,
        id_estado,
        id_proveedor,
        id_categoria,
      },
    });

    return NextResponse.json(nuevoProducto);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al crear el producto',
      },
      {
        status: 500,
      }
    );
  }
}
