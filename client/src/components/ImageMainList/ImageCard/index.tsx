import { Link } from "react-router-dom";
import { IProduct } from "../../../Interface/productInterface";

type ImageCardProps = {
  product: IProduct;
};

const ImageCard = ({ product }: ImageCardProps) => {
  const firstImage = product["Product Image Url"]?.split("|")[0];
  return (
    <Link
      to={`/product?product_id=${product._id}`}
      className="block h-52 cursor-pointer"
    >
      <img src={firstImage} alt="item" className="w-full h-full object-cover" />
    </Link>
  );
};

export default ImageCard;
