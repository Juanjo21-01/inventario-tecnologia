const saberTipo = (tipo) => {
  if (typeof tipo === 'number') {
    return 'number';
  } else if (typeof tipo === 'string') {
    return 'text';
  } else if (typeof tipo === 'boolean') {
    return 'checkbox';
  } else if (typeof tipo === 'object') {
    return 'date';
  }
};

const Input = ({ atributo, setFormulario, formulario }) => {
  const valor = formulario[atributo];

  // capturar el valor del input y actualizar el estado del formulario
  const handleChange = (e) => {
    if (e.target.type === 'number') {
      setFormulario({
        ...formulario,
        [atributo]: Number(e.target.value),
      });
    } else if (e.target.type === 'checkbox') {
      setFormulario({
        ...formulario,
        [atributo]: e.target.checked,
      });
    } else if (e.target.type === 'date') {
      setFormulario({
        ...formulario,
        [atributo]: new Date(e.target.value),
      });
    } else {
      setFormulario({
        ...formulario,
        [atributo]: e.target.value,
      });
    }
  };

  return (
    <input
      type={saberTipo(valor)}
      name={atributo}
      id={atributo}
      value={valor}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Input;
