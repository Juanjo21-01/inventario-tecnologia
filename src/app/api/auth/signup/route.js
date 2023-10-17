import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { hash } from 'bcryptjs';

export async function POST(req) {
  try {
    let { nombre, email, password, id_rol } = await req.json();

    // Parsear los datos a enteros
    id_rol = parseInt(id_rol);

    // Validar que no exista un usuario con el mismo email
    const validarUsuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (validarUsuario)
      return NextResponse.json(
        {
          error: 'El usuario ya existe',
        },
        {
          status: 409,
        }
      );

    // Encriptar la contraseña
    const passwordEncriptada = await hash(password, 12);

    // Creamos un nuevo usuario en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordEncriptada,
        id_rol,
      },
    });

    return NextResponse.json({
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      id_rol: nuevoUsuario.id_rol,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error al crear el usuario',
      },
      {
        status: 500,
      }
    );
  }
}
