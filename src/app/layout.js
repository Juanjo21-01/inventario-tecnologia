import './globals.css';

export const metadata = {
  title: 'Inventario',
  description: 'Gestión de Inventarios - Empresa "Tecnología en un solo lugar"',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
