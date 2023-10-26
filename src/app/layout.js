import './globals.css';
import { Fira_Code } from 'next/font/google';
import Providers from './Providers';

export const metadata = {
  title: 'Inventario',
  description: 'Gestión de Inventarios - Empresa "Tecnología en un solo lugar"',
};

// fuentes
const font = Fira_Code({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin-ext'],
  styles: ['normal', 'italic'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={font.className}>
        <Providers>
          <main className="h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
