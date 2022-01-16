import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { categories } from "../../../constants/categories";

type sidebarProps = {
  openSideBar: boolean;
  setOpenSideBar: (value: boolean) => void;
};

type categoryBtn = {
  category: string;
  handleCategoryClick: (category: string) => void;
};

const CategoryButton = ({ category, handleCategoryClick }: categoryBtn) => {
  const onCategoryClick = () => {
    handleCategoryClick(category);
  };
  return (
    <button
      onClick={onCategoryClick}
      className="group flex justify-between items-center hover:bg-gray-300 w-full py-2 px-6"
    >
      <span className="font-semibold text-sm text-gray-900">{category}</span>
      <div className="text-xl font-semibold text-gray-400 group-hover:text-gray-700">
        <i className="fas fa-chevron-right"></i>
      </div>
    </button>
  );
};

const SideBar = ({ setOpenSideBar, openSideBar }: sidebarProps) => {
  console.log({ openSideBar });
  const navigation = useNavigate();
  const onCloseSideBar = () => {
    setOpenSideBar(false);
  };

  const onCategoryClick = (category: string) => {
    setOpenSideBar(false);
    navigation({
      pathname: "/category",
      search: `?${createSearchParams({ category_id: category })}`,
    });
  };
  return (
    <div
      className={`fixed top-0 left-0 transition-all duration-300 ${
        !openSideBar ? "w-0" : "w-96"
      } min-h-screen bg-white z-50 max-h-screen overflow-auto`}
    >
      {openSideBar && (
        <>
          <div className="bg-blue_131921 flex justify-between items-center px-4 py-2 font-semibold min-w-max">
            <div className="text-gray-200 hover:underline text-lg">
              <Link to="/">Sign In</Link>
            </div>
            <div>
              <button
                onClick={onCloseSideBar}
                className="w-10 h-10 grid place-content-center rounded-full border border-white text-xl font-semibold text-gray-200"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
          </div>
          <div className="min-w-max py-2">
            <h3 className="text-lg font-bold px-6">Shop By Category</h3>
            <div>
              {categories &&
                categories.map((c: string, index: number) => (
                  <CategoryButton
                    key={index}
                    category={c}
                    handleCategoryClick={onCategoryClick}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
