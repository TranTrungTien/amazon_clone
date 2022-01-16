import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IUser } from "../../Interface/userInterface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../Slice/userSlice";
import Waiting from "../../components/Waiting";

const SignUp = () => {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      navigation(location.state, { replace: true });
    }
  }, [user, location.state, navigation]);
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
      rePassword: { value: string };
    };

    if (target.password.value !== target.rePassword.value) {
      return;
    }
    const data = {
      username: target.username.value,
      email: target.email.value,
      password: target.password.value,
    };
    try {
      setIsSignUp(true);
      const response = await axios.post<IUser>(
        `${process.env.REACT_APP_BASE_URL}/users/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        const responseLogin = await axios.post<IUser>(
          `${process.env.REACT_APP_BASE_URL}/users/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (responseLogin.data) {
          const user: IUser = responseLogin.data;
          dispatch(setUser(user));
          navigation("/", { replace: true });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="overflow-hidden w-full flex flex-col justify-center items-start mt-3 space-y-5 pb-10">
      <div className="w-96 mx-auto rounded border border-gray-400 pb-16 pt-4 shadow-lg">
        <h1 className="text-3xl font-medium pl-4">Sign Up</h1>
        <form onSubmit={onSubmit} className="px-4 py-2 space-y-3">
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-2"
              type="text"
              name="username"
              id="username"
            />
          </div>
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
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-medium">
              Re-Enter Password
            </label>
            <input
              className="w-full h-8 rounded-sm border border-gray-400 focus:outline-none px-2"
              type="password"
              name="rePassword"
              id="rePassword"
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

          <p className="text-sm text-blue-600 hover:underline">Need Help</p>

          <button
            disabled={isSignUp}
            type="submit"
            className={`w-full py-2 rounded-md ${
              isSignUp ? "bg-gray-300" : "bg-yellow-300 hover:bg-yellow-400"
            } text-lg font-medium ${isSignUp && "cursor-not-allowed"}`}
          >
            {isSignUp ? (
              <Waiting width="w-8" height="h-8" />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
      </div>
      <div className="flex  justify-center items-center w-full">
        <div className="space-y-1">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline text-base"
            >
              Login
            </Link>
          </span>
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
    </div>
  );
};

export default SignUp;
