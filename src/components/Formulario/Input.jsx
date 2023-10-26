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
        <input
          className="w-full p-3 mb-1 border rounded shadow appearance-none h-7 leading-tight focus:outline-none focus:shadow-outline"
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
        <textarea
          className="w-full p-3 mb-3 border rounded shadow appearance-none h-15 leading-tight focus:outline-none focus:shadow-outline"
          name={atributo}
          id={atributo}
          value={valor}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
      )}

      {campo.etiqueta === 'select' && (
        <select
          className="w-full p-3 mb-3 border rounded shadow h-12 leading-tight focus:outline-none focus:shadow-outline"
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
        <p className="text-sm text-red-400 font-bold">{errors[atributo]}</p>
      )}
    </>
  );
};

export default Input;
