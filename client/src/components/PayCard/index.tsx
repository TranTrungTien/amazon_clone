import axios from "axios";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMe } from "../../Slice/userSlice";
import MessageBox from "../MessageBox";

type PayCardProps = {
  price: string | undefined;
  product_id: string | undefined;
};

const PayCard = ({ price, product_id }: PayCardProps) => {
  console.log("PayCard render ...");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const [qty, setQty] = useState<number>(0);
  console.log({ location });
  const navigation = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onAddToCart = async () => {
    if (qty <= 0) {
      setOpenModal(true);
      console.log("pls enter quantity");
      return;
    }
    if (!user) {
      dispatch(getMe())
        .then((user) => {
          if (!user.payload) {
            navigation("/login", {
              state: location.pathname + location.search,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          navigation("/login", { state: location.pathname + location.search });
        });
    } else {
      let data: object;
      if (price) {
        data = {
          user_id: user._id,
          product_id: product_id,
          price: parseFloat(price) * qty,
          qty: qty,
        };

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/carts/create`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (!response.data) {
            console.log("Something went wrong");
          } else {
            navigation("/my-cart");
          }
        } catch (error) {
          console.log({ error });
        }
      }
    }
  };

  const onBuy = () => {
    if (qty <= 0) {
      setOpenModal(true);
      console.log("pls enter quantity");
      return;
    }
    if (!user) {
      dispatch(getMe())
        .then((user) => {
          if (!user.payload) {
            navigation("/login", {
              state: location.pathname + location.search,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          navigation("/login", { state: location.pathname + location.search });
        });
    } else {
      navigation({
        pathname: "/payment",
        search: `?product_id=${product_id}&buynow=true&qty=${qty}`,
      });
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="rounded-lg border border-gray-500 p-5 space-y-2">
      <div>
        <span className="text-lg font-bold text-red-700">
          ${price && price}
        </span>
      </div>
      <div>
        <span className="font-light text-gray-700">
          FREE delivery: Dec 21 - 27
        </span>
      </div>
      <div>
        <span className="font-light text-gray-700">
          Fastest delivery: Thursday, Dec 16
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-start items-center space-x-2">
          <div>
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div>
            <span className="text-blue-600 text-sm font-thin">
              Choose delivery location
            </span>
          </div>
        </div>
        <div className="flex justify-start items-center space-x-3">
          <label htmlFor="qty" className="text-gray-700 font-thin">
            Qty
          </label>{" "}
          <input
            type="number"
            name="qty"
            id="qty"
            defaultValue={0}
            className="w-14 focus:outline-none border border-gray-400"
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setQty(parseInt(event.currentTarget.value))
            }
          />
          {openModal && (
            <MessageBox
              message="Enter quantity of product !!!"
              title="Warning"
              handleCloseModal={onCloseModal}
            />
          )}
        </div>
        <div className="space-y-3">
          <button
            onClick={onAddToCart}
            className="w-full py-2 rounded-full text-gray-900 font-medium bg-yellow-400 hover:bg-yellow-500"
          >
            Add To Cart
          </button>
          <button
            onClick={onBuy}
            className="w-full py-2 rounded-full text-gray-900 font-medium bg-yellow-500 hover:bg-yellow-600"
          >
            Buy Now
          </button>
        </div>
        <div className="flex justify-start items-center space-x-2">
          <div className="text-gray-800">
            <i className="fas fa-lock"></i>
          </div>
          <div>
            <span className="font-medium text-green-700">
              Secure transaction
            </span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="text-sm font-light text-gray-500 flex flex-col justify-start items-start space-y-2">
        <span className="text-gray-600 font-normal">Ship from Amazon</span>
        <span className="text-gray-600 font-normal">Sold by Xxxx</span>
        <span className="text-gray-600 font-normal truncate w-60">
          Packaging Shows what’s inside. To hide it, choose Ship in Amazon
          Packaging at Checkout.
        </span>
      </div>
      <div>
        <div className="flex justify-start items-center text-2xl space-x-3">
          <span className="text-blue-600 text-sm font-light">Share</span>
          <i className="text-gray-600 far fa-envelope"></i>
          <i className="text-blue-800 fab fa-facebook-square"></i>
          <i className="text-blue-500 fab fa-twitter-square"></i>
          <i className="text-red-700 fab fa-youtube"></i>
        </div>
      </div>
    </div>
  );
};

export default PayCard;
