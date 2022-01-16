import { IProduct } from "../../../Interface/productInterface";
import PayCard from "../../PayCard";

type DetailedInfoProductProps = {
  product: IProduct;
};

const DetailedInfoProduct = ({ product }: DetailedInfoProductProps) => {
  return (
    <div
      style={{ flex: 3 }}
      className="flex justify-start items-start space-x-2 "
    >
      <div style={{ flex: 2 }} className="space-y-2">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {product["Product Name"]}
          </h1>
        </div>
        <div>
          <div>
            <span className="text-sm font-light text-blue-500">
              Visit store
            </span>
          </div>
          <div className="flex justify-start items-center space-x-3">
            <div className="flex justify-center items-center space-x-px">
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
            </div>
            <div>
              <span className="text-sm font-light text-blue-500">
                10 ratings
              </span>{" "}
              <span>|</span>{" "}
              <span className="text-sm font-light text-blue-500">
                22 answered questions
              </span>
            </div>
          </div>
        </div>
        <div className=" space-x-3 flex justify-start items-center">
          <span className="text-gray-600 text-sm">Price:</span>
          <span className="text-red-700 font-bold text-lg">
            {" "}
            ${product["Product Price"]}
          </span>
        </div>
        <div className="space-x-3 flex justify-start items-center">
          <span className="text-gray-600 text-sm">Brands </span>
          <span className="font-semibold">{product["Product Brand"]}</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">About this item</h3>
          <p className="text-gray-800 text-sm">{product["Product Contents"]}</p>
        </div>
      </div>
      <div className="flex-1">
        <PayCard product_id={product["_id"]} price={product["Product Price"]} />
      </div>
    </div>
  );
};

export default DetailedInfoProduct;
