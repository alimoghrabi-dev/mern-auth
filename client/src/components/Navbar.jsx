import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <nav className="fixed w-full top-0 inset-x-0 bg-gray-950 shadow-lg shadow-indigo-600/10 h-28 sm:h-[68px]">
      <div className="w-full h-full flex items-center flex-col sm:flex-row justify-center sm:space-y-0 sm:justify-between px-8 sm:px-12 py-3">
        <h1 className="text-4xl text-gray-100 text-semibold">Auth</h1>
        <div className="flex h-full items-center gap-5 text-lg font-medium text-indigo-500">
          <Link to="/" className="cursor-pointer">
            Home
          </Link>
          <div className="w-[2px] h-[50%] bg-gray-700" />
          <Link to="/about" className="cursor-pointer">
            About
          </Link>
          <div className="w-[2px] h-[50%] bg-gray-700" />
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                src={currentUser.profilePic}
                alt="profile picture"
                className="w-11 h-11 object-cover object-center rounded-full border border-gray-400/50 cursor-pointer hover:ring-2 hover:ring-gray-200 hover:ring-offset-[3px] hover:ring-offset-gray-950 transition-all"
              />
            </Link>
          ) : (
            <Link to="/sign-in" className="cursor-pointer">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
