import Navegacion from '@/components/Navegacion';

export default function PaginasLayout({ children }) {
  return (
    <>
      <Navegacion />

      {children}
    </>
  );
}
``