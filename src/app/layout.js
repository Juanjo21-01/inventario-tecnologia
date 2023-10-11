import './globals.css';

export const metadata = {
  title: 'Inventario',
  description: 'Gestión de Inventarios - Empresa "Tecnología en un solo lugar"',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
}
