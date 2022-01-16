import { IProductSideBarOpt } from "../../Interface/productSideBarInterface";

const ProductSideBar = ({
  category,
  categoryChildren,
  brands,
}: IProductSideBarOpt) => {
  return (
    <div className="w-max flex flex-col justify-start items-start border-r border-gray-400 px-10 py-5 space-y-5">
      <div>
        <h2 className="text-lg font-bold">Category</h2>
        <div className="pl-5">
          <p className="font-semibold">{category}</p>
          {categoryChildren?.map((child, index) => {
            return (
              <div key={index} className="pl-2">
                <p className="text-gray-700">{child}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold">Avg. Customer Review</h2>
        <div className="pl-5">
          <button className="flex justify-start items-center space-x-3 group">
            <div className="flex justify-center items-center space-x-px">
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
            </div>
            <p className="text-gray-600 text-sm font-light group-hover:text-yellow-600">
              {"&"} Up
            </p>
          </button>
          <button className="flex justify-start items-center space-x-3 group">
            <div className="flex justify-center items-center space-x-px">
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
            </div>
            <p className="text-gray-600 text-sm font-light group-hover:text-yellow-600">
              {"&"} Up
            </p>
          </button>
          <button className="flex justify-start items-center space-x-3 group">
            <div className="flex justify-center items-center space-x-px">
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
            </div>
            <p className="text-gray-600 text-sm font-light group-hover:text-yellow-600">
              {"&"} Up
            </p>
          </button>
          <button className="flex justify-start items-center space-x-3 group">
            <div className="flex justify-center items-center space-x-px">
              <i className="fas fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
            </div>
            <p className="text-gray-600 text-sm font-light group-hover:text-yellow-600">
              {"&"} Up
            </p>
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold">Featured Brands</h2>
        <div className="">
          {brands?.map((brand, index) => {
            return (
              <div
                key={index}
                className="flex justify-start pl-5 items-start space-x-2"
              >
                <div className="w-max max-h-full">
                  <input type="checkbox" id="brands1" className="w-5 h-5" />
                </div>
                <label
                  htmlFor="brands1"
                  className="cursor-pointer text-gray-700 truncate"
                >
                  {brand}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold">Price</h2>
        <div className="flex flex-col justify-start items-start pl-4 text-sm font-medium">
          <button>Under $25</button>
          <button>$25 to $50</button>
          <button>$50 to $100</button>
          <button>$100 to $200</button>
          <button>$200 {"&"} Above</button>
        </div>
      </div>
    </div>
  );
};

export default ProductSideBar;
