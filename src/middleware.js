export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard',
    '/compras/:path*',
    '/estados/:path*',
    '/productos/:path*',
    '/proveedores/:path*',
    '/usuarios/:path*',
    '/ventas/:path*',
    '/api/:path*',
  ],
};
