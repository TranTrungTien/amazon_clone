import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Waiting from "../../components/Waiting";
import { IUser } from "../../Interface/userInterface";
import { getMe } from "../../Slice/userSlice";

const Login = () => {
  console.log("Login render ...");
  const user = useAppSelector((state) => state.user);
  const navigation = useNavigate();
  const location = useLocation();
  console.log("state : ", location.state);
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      const currentUrl = location.state ? location.state : "/";
      navigation(currentUrl, { replace: true });
    }
  }, [user, location.state, navigation]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    if (!target.email || !target.password) {
      return;
    } else {
      setIsLogin(true);
      const data = {
        email: target.email.value,
        password: target.password.value,
      };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.data) {
          const user: IUser = response.data;
          console.log({ user });

          dispatch(getMe());
          const currentUrl = location.state ? location.state : "/";
          navigation(currentUrl, { replace: true });
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const onSignUp = () => {
    navigation("/sign-up");
  };
  return (
    <div
      style={{ height: "calc(100vh - 100px)" }}
      className="overflow-hidden w-full flex flex-col justify-center items-center"
    >
      <div className="w-96 mx-auto rounded border border-gray-400 pb-24 pt-8 shadow-lg mb-5">
        <h1 className="text-3xl font-medium pl-4">Login</h1>
        <form onSubmit={onSubmit} className="px-4 py-2 space-y-3">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-medium">
              Email or mobile phone number
            </label>
            <input
              className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-2"
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-2"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <p className="text-xs text-gray-700">
            By continuing, you agree to Amazon's{" "}
            <span className="text-blue-600 hover:underline">
              Conditions of Use
            </span>{" "}
            and{" "}
            <span className="text-blue-600 hover:underline">
              Privacy Notice
            </span>
            .
          </p>

          <p className="text-sm text-blue-600">Need Help</p>

          <button
            disabled={isLogin}
            type="submit"
            className={`w-full py-2 rounded-md ${
              isLogin ? "bg-gray-300" : "bg-yellow-300 hover:bg-yellow-400"
            } text-lg font-medium ${isLogin && "cursor-not-allowed"}`}
          >
            {isLogin ? (
              <Waiting width="w-8" height="h-8" />
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
      <div className="w-96 flex flex-col justify-start items-center space-y-3 text-center">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">New to Amazon ?</p>
          <button
            onClick={onSignUp}
            className="w-full py-1 px-4 rounded border border-gray-500"
          >
            Create your Amazon Account
          </button>
        </div>
        <div className="flex justify-center items-center space-x-5 text-xs text-blue-600">
          <span>Conditions of Use</span>
          <span>Privacy Notice</span>
          <span>Help</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-light">
            © 1996-2021, Amazon.com, Inc. or its affiliates
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
