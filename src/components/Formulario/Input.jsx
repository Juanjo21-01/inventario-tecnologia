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
          name={atributo}
          id={atributo}
          value={valor}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
      )}

      {campo.etiqueta === 'select' && (
        <select
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
