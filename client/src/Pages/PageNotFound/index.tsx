import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-5">
      <Link to="/" className="block px-4 py-2 rounded bg-blue-500 font-medium">
        Go back Home
      </Link>
      <img src="/image/notfound.jpg" alt="pagenotfound" />
    </div>
  );
};

export default PageNotFound;
