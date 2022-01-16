import { productsCategoriesMain } from "../../constants/productsMain";
import ImageMainList from "../ImageMainList";

const BestProducts = () => {
  const productListMain = productsCategoriesMain;
  return (
    <div className="px-16 my-10 space-y-10">
      {productListMain.map((productObject, index) => {
        return (
          <ImageMainList
            category={productObject.category}
            productList={productObject.productList}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default BestProducts;
