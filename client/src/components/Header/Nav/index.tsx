import { Link } from "react-router-dom";

type navProps = {
  setOpenSideBar: (value: boolean) => void;
};

const Nav = ({ setOpenSideBar }: navProps) => {
  const onOpenPopup = () => {
    if (setOpenSideBar) {
      setOpenSideBar(true);
    }
  };
  return (
    <div className="flex justify-start items-center space-x-4 bg-blue_232f3e text-gray-100 px-4 py-2">
      <button
        onClick={onOpenPopup}
        className="space-x-2 text-xl flex justify-start items-center"
      >
        <i className="fas fa-bars"></i>
        <p className="text-base font-medium">All</p>
      </button>
      <div>
        <Link to="/deals">Today's Deals</Link>
      </div>
      <div>
        <Link to="/buy-again">Buy Again</Link>
      </div>
      <div>
        <Link to="/customer-service">Customer Service</Link>
      </div>
      <div>
        <Link to="/history">Browsing History</Link>
      </div>
      <div>
        <Link to="/amazon">Name's Amazon.com</Link>
      </div>
      <div>
        <Link to="/gift">Gift Card</Link>
      </div>
      <div>
        <Link to="/registry">Registry</Link>
      </div>
      <div>
        <Link to="/sell">Sell</Link>
      </div>
    </div>
  );
};

export default Nav;
