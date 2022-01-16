import { IProduct } from "../../Interface/productInterface";
import DetailedInfoProduct from "./DetailedInfoProduct";
import DetailedPictureProduct from "./DetailedPictureProduct";

type DetailProps = {
  product: IProduct;
};

const Detail = ({ product }: DetailProps) => {
  return (
    <div className="py-5 px-10 space-y-5">
      <span className="text-xs font-semibold text-gray-700">
        {product["Product Category"]}
      </span>
      <div className="flex justify-center items-start space-x-6 ">
        <DetailedPictureProduct productImage={product["Product Image Url"]} />
        <DetailedInfoProduct product={product} />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg text-yellow-700 font-medium">Description</h3>
        <p className="font-medium text-sm text-gray-700">
          {product["Product Description"]}
        </p>
      </div>
    </div>
  );
};

export default Detail;
