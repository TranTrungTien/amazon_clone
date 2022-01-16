import { useState } from "react";
import Nav from "./Nav";
import SideBar from "./SideBar";
import TopHeader from "./TopHeader";

const Header = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  return (
    <div className="">
      <TopHeader />
      <Nav setOpenSideBar={setOpenSideBar} />
      <SideBar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />
    </div>
  );
};

export default Header;
