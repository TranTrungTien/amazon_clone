import { ICart } from "../../Interface/myCartInterface";

type CartCardProps = {
  cart: ICart;
};

const CartCard = ({ cart }: CartCardProps) => {
  return (
    <div className="w-full flex justify-between items-start border border-gray-300 rounded shadow px-3 py-1">
      <div className="flex justify-center items-center space-x-5">
        <div style={{ height: "156px", width: "130px" }} className="">
          <img
            src={cart.product["Product Image Url"]}
            alt="cart"
            className="h-full w-full object-cover rounded object-center"
          />
        </div>
        <div className="w-full flex flex-col justify-start items-start space-y-2 flex-1">
          <h1 className="text-medium text-lg truncate max-w-3xl">
            {cart.product["Product Name"]}
          </h1>
          <span className="text-gray-700 text-sm">by Christian Art Gifts</span>
          <div className="flex justify-start items-center space-x-2">
            <div className="flex justify-center items-center space-x-px">
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="fas fa-star text-yellow-600"></i>
              <i className="far fa-star text-yellow-600"></i>
            </div>
            <span className="text-sm text-gray-600">(12345)</span>
          </div>
          <span className="text-sm text-green-600">In Stock</span>
          <span className="text-xs text-gray-600">Qty : </span>
          <div className="flex justify-start items-center space-x-3">
            <div className="flex justify-start items-center space-x-3">
              <label htmlFor="qty" className="text-gray-700 font-thin">
                Qty
              </label>{" "}
              <input
                type="number"
                name="qty"
                id="qty"
                defaultValue={cart.quantity}
                className="w-14 focus:outline-none border border-gray-400"
              />
            </div>
            <button className="text-sm font-medium text-blue-600">
              Delete
            </button>
            <button className="text-sm font-medium text-blue-600">
              Save for later
            </button>
          </div>
        </div>
      </div>
      <div>
        <span className="font-semibold text-xl">${cart.price}</span>
      </div>
    </div>
  );
};

export default CartCard;
