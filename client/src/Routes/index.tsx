import { Route, Routes } from "react-router";
import Checkout from "../Pages/Checkout";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Main from "../Pages/Main";
import MyCart from "../Pages/MyCart";
import MyOrder from "../Pages/MyOrder";
import PageNotFound from "../Pages/PageNotFound";
import ProductDetail from "../Pages/ProductDetail";
import ProductListPage from "../Pages/ProductListPage";
import SearchPage from "../Pages/SearchPage";
import SignUp from "../Pages/SignUp";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-cart" element={<MyCart />} />
      <Route path="/my-order" element={<MyOrder />} />
      <Route path="/payment" element={<Checkout />} />
      <Route path="/product" element={<ProductDetail />} />
      <Route path="/category" element={<ProductListPage />} />
      <Route path="/" element={<Main />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
