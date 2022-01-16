import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import OrderCard from "../../components/OrderCard";
import Waiting from "../../components/Waiting";
import { IMyOrder } from "../../Interface/myOrderInterface";
import { getMe } from "../../Slice/userSlice";
import ErrorPage from "../ErrorPage";

const MyOrder = () => {
  const [myOrder, setMyOrder] = useState<{
    list: IMyOrder[];
    error: Error | null;
  }>({ list: [], error: null });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigation = useNavigate();
  useEffect(() => {
    const getMyOrder = async () => {
      try {
        const response = await axios.get<IMyOrder[]>(
          `${process.env.REACT_APP_BASE_URL}/orders/get-orders`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    };
    if (user) {
      console.log("get order");
      getMyOrder()
        .then((order) => setMyOrder({ list: order, error: null }))
        .catch((error) => {
          console.log({ error });
          setMyOrder({ list: [], error: new Error("Failed to get Orders") });
        });
    } else {
      dispatch(getMe())
        .then((user) => {
          if (!user.payload) {
            navigation("/login");
          }
        })
        .catch((error) => console.log({ error }));
    }
  }, [user, dispatch, navigation]);
  console.log({ myOrder });
  return (
    <div className="w-2/3 mx-auto py-4 space-y-10 min-h-screen">
      {myOrder.list.length === 0 && myOrder.error === null && (
        <Waiting isPage={true} />
      )}
      {myOrder.error ? (
        <ErrorPage />
      ) : myOrder.list.length > 0 ? (
        myOrder.list.map((order, index) => {
          return <OrderCard key={index} order={order} />;
        })
      ) : (
        <div>No Orders</div>
      )}
    </div>
  );
};

export default MyOrder;
