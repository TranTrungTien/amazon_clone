import { IProduct } from "../../Interface/productInterface";
import Pagination from "../Pagination";
import ProductCard from "./ProductCard";

type ProductListingProps = {
  productList: IProduct[];
  totalDocument: number;
  keyword: string | null;
  page: number;
  onChangePage: (page_index: number) => void;
};
const ProductListing = ({
  productList,
  totalDocument,
  keyword,
  page,
  onChangePage,
}: ProductListingProps) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start space-y-4">
      <div className="pl-10 w-full flex justify-start items-center space-x-1 py-6">
        <span className="font-semibold">
          {page * 24} -{" "}
          {page * 24 + 24 > totalDocument ? totalDocument : page * 24 + 24}
        </span>
        <p className="text-gray-800 text-sm"> of over</p>{" "}
        <span className="font-semibold">{totalDocument}</span>{" "}
        <p className="text-gray-800 text-sm">results for </p>
        <i className="font-semibold">"{keyword}"</i>
      </div>
      <div className="py-5 px-10 grid grid-cols-4 gap-4">
        {productList.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </div>
      <div className="w-full py-10 flex justify-center items-center">
        <Pagination totalDocument={totalDocument} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default ProductListing;
