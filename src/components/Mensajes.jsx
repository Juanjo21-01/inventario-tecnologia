'use client';

import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const Mensajes = ({ informacion }) => {
  useEffect(() => {
    if (!informacion) return;

    // Productos con stock entre 6 y 10
    informacion.advertencia.forEach((producto) => {
      toast.error(`${producto.nombre}`, {
        description: `Quedan ${producto.stock} unidades, tomar en cuenta.`,
        duration: 5000,
        style: { background: '#111827' },
      });
    });

    // Productos con stock entre 1 y 5
    informacion.peligro.forEach((producto) => {
      toast.error(`${producto.nombre}`, {
        description: `Quedan ${producto.stock} unidades, se recomienda desactivarlo.`,
        duration: 5000,
      });
    });
  }, [informacion]);

  return (
    <Toaster
      visibleToasts={8}
      theme="system"
      closeButton
      offset={'15px'}
      richColors
    />
  );
};

export default Mensajes;
