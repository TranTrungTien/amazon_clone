import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Waiting from "../../components/Waiting";
import { deleteUser } from "../../Slice/userSlice";

const Logout = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/users/delete-cookie`,
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        throw error;
      }
    };
    if (user) {
      logout()
        .then(() => {
          dispatch(deleteUser());
          navigation("/login", { replace: true });
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }, [user, navigation, dispatch]);
  return <Waiting isPage={true} />;
};

export default Logout;
