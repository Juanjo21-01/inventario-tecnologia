import Navegacion from '@/components/Navegacion';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Inventario',
  description: 'Gestión de Inventarios - Empresa "Tecnología en un solo lugar"',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navegacion />

        {children}

        <Footer />
      </body>
    </html>
  );
}
