import { useState } from "react";
import { IMyOrder } from "../../Interface/myOrderInterface";
import { IProductOrder } from "../../Interface/productOrder";
import MessageBox from "../MessageBox";

type OrderCardProps = {
  order: IMyOrder;
};

type ProductOrderProps = {
  product: IProductOrder;
};

const ProductOrder = ({ product }: ProductOrderProps) => {
  return (
    <div className="flex justify-start items-center space-x-2">
      <div className="w-10 h-10">
        <img
          src={product.product["Product Image Url"]?.split("|")[0]}
          alt="product"
          className="w-full h-full object-cover object-center rounded"
        />
      </div>
      <div className="flex justify-start items-start flex-col flex-1 truncate ">
        <h2 className="text-gray-800 w-full">
          {product.product["Product Name"]}
        </h2>
        <span className="font-medium text-red-600">$${product.price}</span>
      </div>
    </div>
  );
};

const OrderCard = ({ order }: OrderCardProps) => {
  console.log("order card render");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  let position: string;
  switch (order.status) {
    case "confirmed":
      position = "w-0";
      break;
    case "processing":
      position = "w-1/3";
      break;
    case "shipping":
      position = "w-2/3";
      break;
    case "done":
      position = "w-full";
      break;
    default:
      position = "w-0";
      break;
  }
  let gridCol: string;

  switch (order.productListOrdered.length) {
    case 1:
      gridCol = "grid-cols-1";
      break;
    case 2:
      gridCol = "grid-cols-2";
      break;
    case 3:
      gridCol = "grid-cols-3";
      break;
    default:
      gridCol = "grid-cols-4";
      break;
  }

  const onCancel = () => {
    if (order.status === "done" || order.status === "shipping") {
      setShowMessage(true);
    }
  };
  const handleCloseModal = () => {
    setShowMessage(false);
  };
  return (
    <div className="border border-gray-300 shadow-lg rounded">
      {showMessage && (
        <MessageBox
          message="You cannot cancel an order once it has been processed"
          handleCloseModal={handleCloseModal}
        />
      )}
      <div className="pl-2 mt-2">
        <h2 className="text-gray-800 font-medium">My Order/Tracking</h2>
        <h3 className="text-gray-700 text-sm">Order ID : {order._id}</h3>
      </div>
      <div className="flex justify-evenly items-center px-8 py-2 mt-10">
        <div className="flex-1 flex flex-col justify-center items-start border-l-2 border-gray-500 pl-2">
          <h4 className="font-medium text-gray-800 text-lg">
            Estimated Delivery Time
          </h4>
          <span className="text-gray-600 font-light">29 dec 2020</span>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start border-l-2 border-gray-500 pl-2">
          <h4 className="font-medium text-gray-800 text-lg">Shipping By</h4>
          <span className="text-gray-600 font-light">Express / +12345678</span>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start border-l-2 border-gray-500 pl-2">
          <h1 className="font-medium text-gray-800 text-lg">Status</h1>
          <span className="text-gray-600 font-light">{order.status}</span>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start border-l-2 border-gray-500 pl-2">
          <h4 className="font-medium text-gray-800 text-lg">Total Costs</h4>
          <span className="text-red-600 font-medium">${order.totalPrice}</span>
        </div>
      </div>
      <div className=" px-5 mt-6">
        <div className="relative h-1 bg-gray-300">
          <div
            className={`absolute top-0 left-0 ${position} h-full bg-yellow-700`}
          ></div>
          <div>
            <div
              className={`text-2xl absolute z-20 top-0 left-0 transform -translate-y-1/4 text-yellow-700 flex flex-col justify-start items-start`}
            >
              <i className="fas fa-check-circle"></i>
              <span className="text-sm font-medium">Confirmed</span>
            </div>
            <div
              className={`text-2xl absolute z-20 top-0 left-1/3 transform -translate-y-1/4 ${
                order.status === "done" ||
                order.status === "shipping" ||
                order.status === "processing"
                  ? "text-yellow-700"
                  : "text-gray-500"
              } flex flex-col justify-start items-start`}
            >
              <i className="fas fa-tools"></i>
              <span className="text-sm font-medium">Processing</span>
            </div>
            <div
              className={`text-2xl absolute z-20 top-0 left-2/3 transform -translate-y-1/4  ${
                order.status === "done" || order.status === "shipping"
                  ? "text-yellow-700"
                  : "text-gray-500"
              } flex flex-col justify-start items-start`}
            >
              <i className="fas fa-truck"></i>
              <span className="text-sm font-medium">On The Way</span>
            </div>
            <div
              className={`text-2xl absolute z-20 top-0 right-0 transform -translate-y-1/4  ${
                order.status === "done" ? "text-yellow-700" : "text-gray-500"
              } flex flex-col justify-start items-start`}
            >
              <i className="fas fa-calendar-check"></i>
              <span className="text-sm font-medium">Done</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`px-4 grid ${gridCol} gap-3 mt-20`}>
        {order.productListOrdered.map((product, index) => (
          <ProductOrder product={product} key={index} />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-4 mt-8 pb-6">
        <button
          onClick={onCancel}
          className="px-7 py-2 rounded text-center font-medium bg-yellow-600 hover:bg-yellow-700"
        >
          Cancel
        </button>
        <button className="px-7 py-2 rounded text-center font-medium text-purple-600 border border-purple-600 hover:text-purple-800 hover:border-purple-800">
          View More Details
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
