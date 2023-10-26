import Navegacion from '@/components/Navegacion';

export default function PaginasLayout({ children }) {
  return (
    <>
      <Navegacion />

      <section className="container mx-auto mt-5 w-11/12">{children}</section>
    </>
  );
}
``;
