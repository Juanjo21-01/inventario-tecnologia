import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  // Obtenemos un producto de la base de datos
  const producto = await prisma.producto.findUnique({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      codigo_SKU: true,
      precio: true,
      stock: true,
      createdAt: true,
      estado: {
        select: {
          id: true,
          nombre: true,
        },
      },
      proveedor: {
        select: {
          id: true,
          nombre: true,
        },
      },
      categoria: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(producto);
}

export async function PUT(req, { params: { id } }) {
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

  precio = parseInt(precio);
  stock = parseInt(stock);
  id_estado = parseInt(id_estado);
  id_proveedor = parseInt(id_proveedor);
  id_categoria = parseInt(id_categoria);

  // Actualizamos un producto de la base de datos
  const productoActualizado = await prisma.producto.update({
    where: {
      id: Number(id),
    },
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

  return NextResponse.json(productoActualizado);
}

export async function DELETE(req, { params: { id } }) {
  // Eliminamos un producto de la base de datos
  try {
    const productoEliminado = await prisma.producto.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(productoEliminado);
  } catch (error) {
    return NextResponse.error({
      status: 404,
      message: 'No se encontró el producto',
    });
  }
}
