const Card = ({ item }) => {
  const titulo = Object.keys(item) || [];
  return (
    <div className="bg-zinc-100 p-3 rounded-lg border border-slate-300">
      {titulo.map((key, index) => (
        <p key={index} className="text-sm text-indigo-900">
          <span className="font-bold"> {key}: </span> {item[key]}
        </p>
      ))}
    </div>
  );
};

export default Card;
