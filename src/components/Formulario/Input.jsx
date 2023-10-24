const Input = ({
  atributo,
  campo,
  handleChange,
  formulario,
  handleBlur,
  errors,
}) => {
  const valor = formulario[atributo];

  return (
    <>
      {campo.etiqueta === 'input' && (
        <input className='rounded-md w-[250px] h-[25px] bg-[#e0e0e0] text-center'
          type={campo.type}
          name={atributo}
          id={atributo}
          value={valor}
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
      )}

      {campo.etiqueta === 'textarea' && (
        <textarea className='rounded-md w-[250px] h-[40px] bg-[#e0e0e0] text-center'
          name={atributo}
          id={atributo}
          value={valor}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
      )}

      {campo.etiqueta === 'select' && (
        <select className='rounded-md w-[250px] h-[25px] bg-[#e0e0e0] text-center'
          name={atributo}
          id={atributo}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e)}
        >
          <option value="0">Seleccione una opción</option>
          {campo.informacion.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nombre}
            </option>
          ))}
        </select>
      )}

      {errors[atributo] && (
        <p style={{ fontSize: '1.2rem', color: "red" }}>{errors[atributo]}</p>
      )}
    </>
  );
};

export default Input;
