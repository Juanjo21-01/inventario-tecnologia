import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/libs/prisma';
import { compare } from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'ejemplo@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // buscar usuario en la base de datos
        const buscarUsuario = await prisma.usuario.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            nombre: true,
            email: true,
            id_rol: true,
            password: true,
          },
        });

        if (!buscarUsuario) throw new Error('Credenciales invalidas');

        // comparar password
        const passwordMatch = await compare(
          credentials.password,
          buscarUsuario.password
        );

        if (!passwordMatch) throw new Error('Credenciales invalidas');

        delete buscarUsuario.password;
        return buscarUsuario;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
