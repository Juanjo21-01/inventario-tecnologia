const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hash } = require('bcryptjs');

async function seed() {
  try {
    // crear el rol de administrador
    const rolAdmin = await prisma.rol.create({
      data: {
        nombre: 'Administrador',
        descripcion: 'Rol de administrador',
      },
    });
    console.log('Rol de administrador creado: ', rolAdmin);

    // Encriptar la contraseña
    const passwordEncriptada = await hash(process.env.PASSWORD_USER, 12);
    const usuarioPrincipal = await prisma.usuario.create({
      data: {
        nombre: 'UMG',
        email: 'prueba@gmail.com',
        password: passwordEncriptada,
        id_rol: 1,
      },
    });
    console.log('Usuario principal creado: ', usuarioPrincipal);
  } catch (error) {
    console.log('Error al crear el usuario principal: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = seed();
