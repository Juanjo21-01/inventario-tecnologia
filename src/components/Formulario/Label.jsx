const Label = ({ atributo }) => {
  const htmlForAtributo = atributo;

  // Quitar el prefijo 'id' si existe
  if (atributo.startsWith('id')) atributo = atributo.slice(3);

  // Reemplazar guiones bajos por espacios
  atributo = atributo.split('_').join(' ');

  // Convertir la primera letra en mayúscula
  atributo = atributo[0].toUpperCase() + atributo.slice(1);

  return <label htmlFor={htmlForAtributo}>{atributo}</label>;
};

export default Label;
