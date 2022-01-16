import { Link } from "react-router-dom";
import { IProduct } from "../../../Interface/productInterface";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const price = product["Product Price"]?.split(".");
  const productImage = product["Product Image Url"]?.split("|")[0];
  return (
    <Link
      to={`/product?product_id=${product._id}`}
      className="space-y-2 cursor-pointer flex flex-col justify-between items-start group"
    >
      <div>
        <div style={{ height: "278px" }} className="">
          <img
            src={productImage && productImage}
            alt="Product card"
            className="w-full h-full object-cover rounded"
          />
        </div>
        <p
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
          className="text-lg font-light leading-6 overflow-hidden text-gray-800 group-hover:text-black"
        >
          {product["Product Name"]}
        </p>
      </div>
      <div>
        <div className="flex justify-start items-start space-x-px">
          <i className="fas fa-star text-yellow-600"></i>
          <i className="fas fa-star text-yellow-600"></i>
          <i className="fas fa-star text-yellow-600"></i>
          <i className="fas fa-star text-yellow-600"></i>
          <i className="far fa-star text-yellow-600"></i>
        </div>
        <div className="text-gray-600 space-x-px">
          <sup>$</sup>
          <span className="font-bold text-black text-xl">
            {price && price[0]}
          </span>
          <sup>{price && price[1]}</sup>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
