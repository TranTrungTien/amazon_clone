import CategoryCard from "../CategoryCard";
import { categoriesMain } from "../../constants/categoriesMain";

const CategoryCardList = () => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-4 gap-5 grid-rows-2 -mt-96 relative z-10">
      {categoriesMain.map((c_name: string, index: number) => {
        let imageUrl = "";
        if (c_name === "Electronics") {
          imageUrl = "./image/Electronics.jpeg";
        } else if (c_name === "Baby") {
          imageUrl = "./image/Baby.jpg";
        } else if (c_name === "Beauty") {
          imageUrl = "./image/Beauty.png";
        } else if (c_name === "Pet Supplies") {
          imageUrl = "./image/Pet.jpeg";
        } else if (c_name === "Sports, Fitness & Outdoors") {
          imageUrl = "./image/Fitness.jpg";
        } else if (c_name === "Clothing, Shoes & Jewelry") {
          imageUrl = "./image/Clothing.jpg";
        } else if (c_name === "Garden") {
          imageUrl = "./image/Garden.jpg";
        } else {
          imageUrl = "./image/Skincare.jpg";
        }
        return (
          <CategoryCard key={index} categoryName={c_name} imageUrl={imageUrl} />
        );
      })}
    </div>
  );
};

export default CategoryCardList;
