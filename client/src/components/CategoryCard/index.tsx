import { Link } from "react-router-dom";

type CategoryCardProps = {
  categoryName: string;
  imageUrl: string;
};

const CategoryCard = ({ categoryName, imageUrl }: CategoryCardProps) => {
  return (
    <div className="p-5 bg-white rounded flex flex-col justify-center items-start">
      <h1 style={{ fontSize: "21px" }} className="font-bold text-gray-900">
        {categoryName}
      </h1>
      <div
        style={{
          height: "310px",
        }}
        className="my-3 w-full"
      >
        <img
          src={imageUrl}
          alt="category-card"
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <Link
        to={`/category?category_id=${categoryName}`}
        className="text-sm text-blue-600 hover:underline hover:text-blue-700"
      >
        Shop now
      </Link>
    </div>
  );
};

export default CategoryCard;
