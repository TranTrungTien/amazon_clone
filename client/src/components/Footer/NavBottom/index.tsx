const NavBottom = () => {
  return (
    <div className="bg-blue_232f3e text-gray-200 text-sm font-medium">
      <div className="grid grid-cols-4 py-10 gap-10 px-80">
        <div className="space-y-3">
          <h2 className="text-base font-bold text-gray-100">
            Get to Know Us Relations Amazon Devices
          </h2>
          <ul className="space-y-2">
            <li className="hover:underline text-gray-300">Careers</li>
            <li className="hover:underline text-gray-300">Blog</li>
            <li className="hover:underline text-gray-300">About Amazon</li>
            <li className="hover:underline text-gray-300">
              Investor Relations
            </li>
            <li className="hover:underline text-gray-300">Amazon Devices</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-bold text-gray-100">
            Make Money with Us
          </h2>
          <ul className="space-y-2">
            <li className="hover:underline text-gray-300">
              Sell products on Amazon
            </li>
            <li className="hover:underline text-gray-300">
              Sell on Amazon Business
            </li>
            <li className="hover:underline text-gray-300">
              Sell apps on Amazon
            </li>
            <li className="hover:underline text-gray-300">
              Become an Affiliate
            </li>
            <li className="hover:underline text-gray-300">
              Advertise Your Products
            </li>
            <li className="hover:underline text-gray-300">
              Self-Publish with Us
            </li>
            <li className="hover:underline text-gray-300">
              Host an Amazon Hub
            </li>
            <li className="hover:underline text-gray-300">
              See More Make Money with Us
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-bold text-gray-100">
            Amazon Payment Products
          </h2>
          <ul className="space-y-2">
            <li className="hover:underline text-gray-300">
              Amazon Business Card
            </li>
            <li className="hover:underline text-gray-300">Shop with Points</li>
            <li className="hover:underline text-gray-300">
              Reload Your Balance
            </li>
            <li className="hover:underline text-gray-300">
              Amazon Currency Converter
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-bold text-gray-100">Let Us Help You</h2>
          <ul className="space-y-2">
            <li className="hover:underline text-gray-300">
              Amazon and COVID-19
            </li>
            <li className="hover:underline text-gray-300">Your Account</li>
            <li className="hover:underline text-gray-300">Your Orders</li>
            <li className="hover:underline text-gray-300">
              Shipping Rates {"&"} Policies
            </li>
            <li className="hover:underline text-gray-300">
              Returns {"&"} Replacements
            </li>
            <li className="hover:underline text-gray-300">
              Manage Your Content and Devices
            </li>
            <li className="hover:underline text-gray-300">Amazon Assistant</li>
            <li className="hover:underline text-gray-300">Help</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-20 py-8 border-t border-gray-600">
        <div className="h-9, w-24">
          <img
            src="/image/amazon.png"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center space-x-3">
          <div className="border border-gray-500 px-2 py-1 rounded-sm">
            <select
              name="languages"
              className="bg-blue_232f3e focus:outline-none"
            >
              <option defaultChecked={true} value="">
                English
              </option>
              <option value="">VietNamese</option>
              <option value="">Korean</option>
              <option value="">Chinese</option>
            </select>
          </div>
          <div className="border border-gray-500 px-2 py-1 rounded-sm">
            <select
              name="money_types"
              className="bg-blue_232f3e focus:outline-none"
            >
              <option defaultChecked={true} value="">
                Dollars
              </option>
              <option value="">Vnd</option>
              <option value="">Yuan</option>
              <option value="">Yen</option>
            </select>
          </div>
          <div className="border border-gray-500 px-2 py-1 rounded-sm">
            United States
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBottom;
