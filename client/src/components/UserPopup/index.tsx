import { opt } from "../../constants/userOpt";

const UserPopup = () => {
  return (
    <div className="absolute top-full right-0 bg-white z-50 rounded-md">
      <ul className="py-3">
        {opt.map((v, index) => {
          return (
            <li className="px-8 py-2 hover:bg-gray-300 rounded" key={index}>
              <a
                className="whitespace-nowrap text-gray-700 text-sm block w-full h-full hover:text-gray-900 hover:underline"
                href={v.path}
              >
                {v.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserPopup;
