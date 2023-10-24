'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Label from './Label';

const Formulario = ({ campos, pathname, id, datosActualizar, detalle }) => {
  // ESTADO INICIAL
  const initialState = Object.keys(campos).reduce((obj, item) => {
    obj[item] = campos[item].value;
    return obj;
  }, {});

  // VARIABLES DE ESTADO
  const [formulario, setFormulario] = useState(initialState);
  const [detalles, setDetalles] = useState([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // VALIDAR FORMULARIO
  const validar = (formulario) => {
    let errors = {};
    let regexName = /^[a-zA-ZÀ-ÿ\s]{1,100}$/;
    let regexSku = /^[a-zA-Z0-9]{1,20}$/;
    let regexPrecio = /^[0-9]{1,10}([.][0-9]{1,2})?$/;
    let regexCantidad = /^[0-9]{1,10}$/;
    let regexImpuesto = /^[0-9]{1,3}([.][0-9]{1,2})?$/;
    let regexSelects = /^[1-9]{1,10}$/;
    let regexDescripcion = /^.{1,255}$/;
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let regexTelefono = /^[0-9]{1,10}$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // ERRORES DEL FORMULARIO
    const camposFormulario = Object.keys(formulario);

    // nombre
    if (camposFormulario.includes('nombre')) {
      if (!formulario.nombre.trim()) {
        errors.nombre = 'El campo "Nombre" es requerido';
      } else if (!regexName.test(formulario.nombre.trim())) {
        errors.nombre =
          'El campo "Nombre" es incorrecto, sólo acepta letras y espacios en blanco';
      }
    }

    // Codigo SKU
    if (camposFormulario.includes('codigo_SKU')) {
      if (!formulario.codigo_SKU.trim()) {
        errors.codigo_SKU = 'El campo "Código SKU" es requerido';
      } else if (!regexSku.test(formulario.codigo_SKU.trim())) {
        errors.codigo_SKU =
          'El campo "Código SKU" es incorrecto, sólo acepta letras y números';
      }
    }

    // Precio
    if (camposFormulario.includes('precio')) {
      if (!formulario.precio) {
        errors.precio = 'El campo "Precio" es requerido';
      } else if (!regexPrecio.test(formulario.precio)) {
        errors.precio =
          'El campo "Precio" es incorrecto, sólo acepta números positivos y de 10 dígitos como máximo';
      }
    }

    // Cantidad y Stock
    if (camposFormulario.includes('stock')) {
      if (!formulario.stock) {
        errors.stock = 'El campo "Stock" es requerido';
      } else if (!regexCantidad.test(formulario.stock)) {
        errors.stock =
          'El campo "Stock" es incorrecto, sólo acepta números enteros positivos';
      }
    }
    if (camposFormulario.includes('cantidad')) {
      if (!formulario.cantidad) {
        errors.cantidad = 'El campo "Cantidad" es requerido';
      } else if (!regexCantidad.test(formulario.cantidad)) {
        errors.cantidad =
          'El campo "Cantidad" es incorrecto, sólo acepta números enteros positivos';
      }
    }

    // Impuesto
    if (camposFormulario.includes('impuesto')) {
      if (!formulario.impuesto) {
        errors.impuesto = 'El campo "Impuesto" es requerido';
      } else if (!regexImpuesto.test(formulario.impuesto)) {
        errors.impuesto =
          'El campo "Impuesto" es incorrecto, sólo acepta números positivos y de 3 dígitos como máximo';
      }
    }

    // Estado
    if (camposFormulario.includes('id_estado')) {
      if (!formulario.id_estado) {
        errors.id_estado = 'El campo "Estado" es requerido';
      } else if (!regexSelects.test(formulario.id_estado)) {
        errors.id_estado = 'El campo "Estado" es incorrecto';
      }
    }

    // Proveedor
    if (camposFormulario.includes('id_proveedor')) {
      if (!formulario.id_proveedor) {
        errors.id_proveedor = 'El campo "Proveedor" es requerido';
      } else if (!regexSelects.test(formulario.id_proveedor)) {
        errors.id_proveedor = 'El campo "Proveedor" es incorrecto';
      }
    }

    // Categoria
    if (camposFormulario.includes('id_categoria')) {
      if (!formulario.id_categoria) {
        errors.id_categoria = 'El campo "Categoría" es requerido';
      } else if (!regexSelects.test(formulario.id_categoria)) {
        errors.id_categoria = 'El campo "Categoría" es incorrecto';
      }
    }

    // Producto
    if (camposFormulario.includes('id_producto')) {
      if (!formulario.id_producto) {
        errors.id_producto = 'El campo "Producto" es requerido';
      } else if (!regexSelects.test(formulario.id_producto)) {
        errors.id_producto = 'El campo "Producto" es incorrecto';
      }
    }

    // Descripcion y Motivo
    if (camposFormulario.includes('descripcion')) {
      if (!formulario.descripcion.trim()) {
        errors.descripcion = 'El campo "Descripción" es requerido';
      } else if (!regexDescripcion.test(formulario.descripcion.trim())) {
        errors.descripcion =
          'El campo "Descripción" es incorrecto, sólo acepta 255 caracteres como máximo';
      }
    }
    if (camposFormulario.includes('motivo')) {
      if (!formulario.motivo.trim()) {
        errors.motivo = 'El campo "Motivo" es requerido';
      } else if (!regexDescripcion.test(formulario.motivo.trim())) {
        errors.motivo =
          'El campo "Motivo" es incorrecto, sólo acepta 255 caracteres como máximo';
      }
    }

    // Fecha
    if (camposFormulario.includes('fecha')) {
      if (!formulario.fecha) {
        errors.fecha = 'El campo "Fecha" es requerido';
      }
    }

    // Nit
    if (camposFormulario.includes('nit')) {
      if (!formulario.nit.trim()) {
        errors.nit = 'El campo "NIT" es requerido';
      } else if (!regexSku.test(formulario.nit.trim())) {
        errors.nit =
          'El campo "NIT" es incorrecto, sólo acepta letras y números';
      }
    }

    // Email
    if (camposFormulario.includes('email')) {
      if (!formulario.email.trim()) {
        errors.email = 'El campo "Email" es requerido';
      } else if (!regexEmail.test(formulario.email.trim())) {
        errors.email = 'El campo "Email" es incorrecto';
      }
    }

    // Telefono
    if (camposFormulario.includes('telefono')) {
      if (!formulario.telefono.trim()) {
        errors.telefono = 'El campo "Teléfono" es requerido';
      } else if (!regexTelefono.test(formulario.telefono.trim())) {
        errors.telefono =
          'El campo "Teléfono" es incorrecto, sólo acepta números y de 10 dígitos como máximo';
      }
    }

    // Direccion
    if (camposFormulario.includes('direccion')) {
      if (!formulario.direccion.trim()) {
        errors.direccion = 'El campo "Dirección" es requerido';
      } else if (!regexDescripcion.test(formulario.direccion.trim())) {
        errors.direccion =
          'El campo "Dirección" es incorrecto, sólo acepta 255 caracteres como máximo';
      }
    }

    // Rol
    if (camposFormulario.includes('id_rol')) {
      if (!formulario.id_rol) {
        errors.id_rol = 'El campo "Rol" es requerido';
      } else if (!regexSelects.test(formulario.id_rol)) {
        errors.id_rol = 'El campo "Rol" es incorrecto';
      }
    }

    // Password
    if (camposFormulario.includes('password')) {
      if (!formulario.password.trim()) {
        errors.password = 'El campo "Contraseña" es requerido';
      } else if (!regexPassword.test(formulario.password.trim())) {
        errors.password =
          'El campo "Contraseña" es incorrecto, debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número';
      }
    }

    return errors;
  };

  // MANEJAR CAMBIOS EN EL FORMULARIO
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  // MANEJAR CAMBIOS DE FOCO EN LOS INPUTS
  const handleBlur = (e) => {
    handleChange(e);

    // VALIDAR CAMPOS
    setErrors(validar(formulario));
  };

  // VER PARAMS PARA ACTUALIZAR
  useEffect(() => {
    if (!id) return;

    setFormulario(datosActualizar);
  }, [id, datosActualizar]);

  // SUBIR DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario
    setErrors(validar(formulario));

    // Si hay errores, no se envía el formulario
    if (Object.keys(errors).length > 0) return;

    if (!id) {
      // crear datos
      await fetch(`/api${pathname}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });
    } else {
      // actualizar datos
      await fetch(`/api${pathname}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });
    }

    handleReset();

    if (pathname == '/auth/signup') {
      router.push('/usuarios');
      router.refresh();
      return;
    }

    router.push(pathname);
    router.refresh();
  };

  // RESETEAR FORMULARIO
  const handleReset = () => setFormulario(initialState);

  // HACER EL DETALLE DE COMPRA O VENTA
  const handleClick = () => {
    console.log('AGREGAR AL DETALLE');

    if (
      formulario.id_producto == 0 ||
      formulario.cantidad == 0 ||
      formulario.precio == 0
    ) {
      alert('Seleccione un producto, una cantidad y un precio');
      return;
    }

    const detalle = {
      id_producto: formulario.id_producto,
      cantidad: formulario.cantidad,
      precio: formulario.precio,
    };

    // CALCULAR TOTAL
    const totalIngresado = formulario.cantidad * formulario.precio;
    setTotal(total + totalIngresado);

    // AGREGAR DETALLE
    setDetalles([...detalles, detalle]);

    // AGREGAR DETALLE Y TOTAL AL FORMULARIO
    setFormulario({
      ...formulario,
      Detalle: [...detalles, detalle],
      total: total + totalIngresado,
    });
  };

  // QUITAR ELEMENTO DEL DETALLE
  const quitarElemento = (detalle) => {
    console.log('QUITAR ELEMENTO');

    // Reducir el estado de detalles
    const detallesFiltrados = detalles.filter((item) => item !== detalle);

    // Reducir el total
    const totalReducido = total - detalle.cantidad * detalle.precio;
    setTotal(totalReducido);

    // Actualizar el estado de detalles
    setDetalles(detallesFiltrados);

    // Actualizar el estado de formulario
    setFormulario({
      ...formulario,
      Detalle: detallesFiltrados,
      total: totalReducido,
    });
  };

  return (
    <form className='flex flex-col justify-center items-center bg-[#fff] py-12 px-20 mt-0 my-auto gap-6' onSubmit={handleSubmit}>
      {Object.keys(formulario).map((atributo) => {
        return (
          <div className='flex flex-row gap-10' key={atributo}>
            <Label atributo={atributo} />

            <Input 
              atributo={atributo}
              campo={campos[atributo]}
              formulario={formulario}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
            />
          </div>
        );
      })}

      {/* DETALLE DE COMPRA O VENTA */}
      {detalle ? (
        <>
          <button className='rounded-xl bg-[#35cdce] text-white w-[100px] h-[50px] ' type="button" onClick={handleClick}>
            Agregar
          </button>

          

          <table className='w-[800px]'>
            <thead>
              <tr className='flex flex-row item-center justify-around bg-[#35cdce] rounded '>
                <th className='text-[16px] text-white'>Acciones</th>
                <th className='text-[16px] text-white'>Producto</th>
                <th className='text-[16px] text-white'>Cantidad</th>
                <th className='text-[16px] text-white'>Precio</th>
                <th className='text-[16px] text-white'>Sub Total</th>
              </tr>
            </thead>

            <tbody>
              {detalles.map((detalle, index) => (
                <tr className='flex flex-row item-center justify-around border-b-2'key={index}>
                  <td>
                    <button
                      type="button"
                      onClick={() => quitarElemento(detalle)}
                    >
                      Quitar
                    </button>
                  </td>
                  <td>
                    {campos.id_producto.informacion.map((producto) => {
                      if (detalle.id_producto == producto.id)
                        return producto.nombre;
                    })}
                  </td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precio}</td>
                  <td>{detalle.cantidad * detalle.precio}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total</td>
                <td>{total}</td>
              </tr>
            </tfoot>
          </table>

          {detalles.length > 0 && <button type="submit">Crear</button>}
        </>
      ) : (
        <>
          {id ? (
            <button type="submit">Actualizar</button>
          ) : (
            <button type="submit">Crear</button>
          )}
        </>
      )}
    </form>
  );
};

export default Formulario;
