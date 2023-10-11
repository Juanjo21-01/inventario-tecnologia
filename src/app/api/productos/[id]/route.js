import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req, { params: { id } }) {
  try {
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

    // Si no se encuentra el producto, devolvemos un error
    if (!producto)
      return NextResponse.json(
        {
          message: 'No se encontró el producto',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener el producto',
      },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req, { params: { id } }) {
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
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener el producto',
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  try {
    // Eliminamos un producto de la base de datos
    const productoEliminado = await prisma.producto.delete({
      where: {
        id: Number(id),
      },
    });

    if (!productoEliminado)
      return NextResponse.json(
        {
          message: 'No se encontró el producto',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(productoEliminado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener el producto',
      },
      {
        status: 400,
      }
    );
  }
}
