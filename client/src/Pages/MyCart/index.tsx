import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CartCard from "../../components/CartCard";
import Empty from "../../components/Empty";
import Waiting from "../../components/Waiting";
import { ICart } from "../../Interface/myCartInterface";
import { getMe } from "../../Slice/userSlice";
import ErrorPage from "../ErrorPage";

const MyCart = () => {
  const user = useAppSelector((state) => state.user);
  console.log({ user });
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const [myCartList, setMyCartList] = useState<{
    list: ICart[] | [];
    totalCost?: string;
    error: null | Error;
    isLoading: boolean;
  }>({ list: [], error: null, isLoading: true });
  useEffect(() => {
    const getMyCart = async () => {
      try {
        const response = await axios.get<ICart[]>(
          `${process.env.REACT_APP_BASE_URL}/carts/mycart`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        console.log({ error });
        throw error;
      }
    };
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
      getMyCart()
        .then((cartList) => {
          if (cartList.length === 0) {
            setMyCartList({ list: [], error: null, isLoading: false });
          } else {
            let total = 0;
            for (const cart of cartList) {
              total += parseFloat(cart["price"].toString());
            }
            setMyCartList({
              list: cartList,
              totalCost: total.toFixed(2),
              error: null,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log({ error });
          setMyCartList({
            list: [],
            error: new Error("Failed to load data"),
            isLoading: false,
          });
        });
    }
  }, [
    location.pathname,
    location.search,
    navigation,
    user,
    dispatch,
    location.state,
  ]);

  const onCheckout = () => {
    if (myCartList) {
      const idList = [];
      for (const cart of myCartList.list) {
        idList.push(cart["_id"]);
      }
      navigation({
        pathname: "/payment",
        search: `?cartIds=${idList.join(",")}`,
      });
    }
  };

  console.log({ myCartList });

  return (
    <div className="w-11/12 mx-auto py-10 flex justify-between items-start space-x-3 overflow-hidden min-h-screen">
      {myCartList.error ? (
        <div className="w-full h-full flex justify-center items-center">
          <ErrorPage />
        </div>
      ) : myCartList.isLoading ? (
        <div className="w-full h-screen flex justify-center items-center ">
          <Waiting isPage={true} />
        </div>
      ) : (
        <>
          <div className="w-full h-full bg-white p-4" style={{ flex: 4 }}>
            <div>
              <div>
                <h1 className="text-3xl font-medium">Shopping Cart</h1>
                <button className="text-sm text-blue-600">
                  Deselect all items
                </button>
              </div>
              {myCartList.list.length > 0 ? (
                <>
                  <div className="w-full h-full flex justify-end">
                    <span className="text-gray-700 text-sm font-light">
                      Price
                    </span>
                  </div>
                  <div className="space-y-2">
                    {myCartList?.list.map((cart, index) => (
                      <CartCard key={index} cart={cart} />
                    ))}
                  </div>
                </>
              ) : (
                <Empty />
              )}
            </div>
            {myCartList?.list.length > 0 && (
              <div className="flex justify-end items-center space-x-1 text-gray-800 text-lg">
                <h4>Subtotal</h4>
                <span>({myCartList.list.length} Items)</span>
                <span className="font-semibold text-black text-xl">
                  ${myCartList.totalCost}
                </span>
              </div>
            )}
          </div>
          {myCartList?.list.length > 0 && (
            <div className="flex-1 shadow-xl rounded border border-gray-300 px-5 py-2">
              <div className="space-y-3">
                <div className="flex justify-start items-center space-x-1 text-gray-900 text-lg">
                  <h3>Subtotal</h3> <span>{myCartList.list.length} Items</span>
                  <span className="font-semibold text-xl text-gray-900">
                    ${myCartList.totalCost}
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full h-8 mx-auto rounded-xl bg-yellow-400 font-medium hover:bg-yellow-500"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCart;
