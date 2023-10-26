import Card from './Card';

const Cards = ({ datos }) => {
  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center gap-5 m-5 ">
      {datos.length > 0 ? (
        <>
          {datos.map((dato, index) => (
            <Card key={index} item={dato} />
          ))}
        </>
      ) : (
        <p className="text-2xl font-bold text-center text-rose-500 p-5">
          No hay elementos
        </p>
      )}
    </div>
  );
};

export default Cards;
