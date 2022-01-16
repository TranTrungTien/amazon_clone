import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { categories } from "../../../constants/categories";
import { getMe } from "../../../Slice/userSlice";
import UserPopup from "../../UserPopup";

const TopHeader = () => {
  console.log("Top header render");
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.user);
  const [showUserPopup, setShowUserPopup] = useState<boolean>(false);

  console.log({ user });

  const onShowUserPopup = () => {
    if (!user) {
      return;
    }
    setShowUserPopup(!showUserPopup);
  };

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [user, dispatch]);

  const onSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      search: { value: string };
      category: { value: string };
    };
    const s = target.search.value;
    const c = target.category.value;
    navigation({
      pathname: "/search",
      search: `?category=${c}&q=${s}&limit=24`,
    });
  };

  return (
    <div className="bg-blue_131921 flex justify-center items-center text-gray-100 px-6 py-3 space-x-4 text-sm">
      <div className="w-24 h-9">
        <Link to="/">
          <img className="w-full h-full" src="/image/amazon.png" alt="Logo" />
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <div className="text-lg">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div>
          <p
            style={{ lineHeight: "16px" }}
            className="font-thin text-gray-300  text-xs"
          >
            Deliver To
          </p>{" "}
          <p style={{ lineHeight: "16px" }} className="font-bold">
            VietNam
          </p>
        </div>
      </div>
      <div className="flex-1 w-full h-full flex justify-center items-center rounded-md">
        <form
          onSubmit={onSearch}
          autoComplete="off"
          className="flex justify-center items-center w-full h-10"
        >
          <div style={{ maxWidth: "60px" }} className="h-full">
            <select
              name="category"
              className="text-gray-700 block h-full focus:outline-none  rounded-l-md px-2 border-r w-full border-gray-300 font-semibold"
            >
              <option defaultChecked={true} value="All">
                All
              </option>
              {categories.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="search"
              className="w-full text-gray-800 focus:outline-none px-3 py-2 leading-6"
            />
          </div>
          <button
            type="submit"
            className="w-12 h-full bg-orange_e5c399 hover:bg-orange_f3a847 text-gray-700  rounded-r-md text-xl font-semibold"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div className="h-10">
        <select
          name="language"
          style={{ maxWidth: "70px" }}
          className="bg-blue_131921 focus:outline-none cursor-pointer h-full"
        >
          <option value="usa" defaultChecked={true}>
            English
          </option>
          <option value="usa">Chinese</option>
          <option value="usa">VietNamese</option>
          <option value="usa">Korean</option>
        </select>
      </div>
      <div className="h-10 relative">
        <button
          onClick={onShowUserPopup}
          className="font-bold flex flex-col justify-center items-start h-full"
        >
          {user ? (
            <div>
              <span className="text-gray-300 hover:text-gray-200 text-xs hover:underline">
                {user.username}
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              state={location.pathname + location.search}
              className="text-gray-300 hover:text-gray-200 text-xs hover:underline"
              style={{ lineHeight: "16px" }}
            >
              Login
            </Link>
          )}
          <p className="font-bold" style={{ lineHeight: "16px" }}>
            Account {"&"} List
          </p>
        </button>
        {showUserPopup && <UserPopup />}
      </div>
      <div className="h-10">
        <Link
          to="/my-order"
          className="flex justify-center flex-col items-start h-full hover:underline"
        >
          <p
            style={{ lineHeight: "16px" }}
            className="font-light text-gray-300 text-xs"
          >
            Return
          </p>
          <p style={{ lineHeight: "16px" }} className="font-bold">
            {"&"} Orders
          </p>
        </Link>
      </div>
      <div className="h-10">
        <Link
          to="/my-cart"
          className="text-2xl space-x-1 font-bold w-full flex justify-center items-center h-full"
        >
          <i className="fab fa-opencart"></i>
          <p className="text-base">Cart</p>
        </Link>
      </div>
    </div>
  );
};

export default TopHeader;
