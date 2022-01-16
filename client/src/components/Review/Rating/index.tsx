const arr = Array(5).fill(1);

type RatingProps = {
  star: number;
  handleStar: (star: number) => void;
};

const Rating = ({ handleStar, star }: RatingProps) => {
  const onClickStar = (event: any, index: number) => {
    handleStar(index);
  };
  return (
    <div className="flex justify-start items-center space-x-px text-xl">
      {arr.map((value, index) => {
        return (
          <i
            key={index}
            onClick={(e) => onClickStar(e, index)}
            className={`cursor-pointer hover:text-yellow-600 fas fa-star ${
              index <= star ? "text-yellow-600" : "text-gray-600"
            }`}
          ></i>
        );
      })}
    </div>
  );
};

export default Rating;
