import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { hash } from 'bcryptjs';

export async function GET(req, { params: { id } }) {
  try {
    // Obtenemos un usuario de la base de datos
    const usuario = await prisma.usuario.findUnique({
      select: {
        nombre: true,
        email: true,
        createdAt: true,
        rol: {
          select: {
            id: true,
            nombre: true,
          },
        },
        Venta: {
          select: {
            id: true,
            fecha: true,
            total: true,
          },
        },
        Compra: {
          select: {
            id: true,
            fecha: true,
            total: true,
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el usuario, devolvemos un error
    if (!usuario)
      return NextResponse.json(
        {
          message: 'No se encontró el usuario',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al obtener el usuario',
      },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req, { params: { id } }) {
  try {
    let { nombre, email, password, id_rol } = await req.json();

    // Parsear los datos a enteros
    id_rol = parseInt(id_rol);

    // Encriptar la contraseña
    const passwordEncriptada = await hash(password, 12);

    // Actualizamos un usuario de la base de datos
    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        email,
        password: passwordEncriptada,
        id_rol,
      },
    });

    // Si no se encuentra el usuario, devolvemos un error
    if (!usuarioActualizado)
      return NextResponse.json(
        {
          message: 'No se encontró el usuario',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al actualizar el usuario',
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
  try {
    // Eliminamos un usuario de la base de datos
    const usuarioEliminado = await prisma.usuario.delete({
      where: {
        id: Number(id),
      },
    });

    // Si no se encuentra el usuario, devolvemos un error
    if (!usuarioEliminado)
      return NextResponse.json(
        {
          message: 'No se encontró el usuario',
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(usuarioEliminado);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al eliminar el usuario',
      },
      {
        status: 400,
      }
    );
  }
}
