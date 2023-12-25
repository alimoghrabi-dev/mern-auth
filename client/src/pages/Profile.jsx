import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-full flex flex-col items-center justify-start mt-28 space-y-12">
      <h1 className="text-3xl text-gray-100 font-semibold capitalize">
        Hello, <span className="text-violet-500">{currentUser.username}</span>
      </h1>
      <div className="flex items-center gap-6">
        <img
          src={currentUser.profilePic}
          alt="profile picture"
          className="w-24 h-24 object-cover object-center rounded-full shadow-md shadow-violet-500/40"
        />
        <div className="h-20 w-[2px] bg-gray-700/75" />
        <span className="flex flex-col items-start gap-5">
          <p className="text-xl font-semibold text-gray-100 capitalize">
            {currentUser.username}
          </p>
          <p className="text-base font-medium text-gray-500">
            {currentUser.email}
          </p>
        </span>
      </div>
      <Link
        to="/profile/edit"
        className="bg-violet-600 text-gray-50 text-lg text-medium py-2 px-5 rounded-lg hover:bg-opacity-80 transition-all">
        Edit Profile
      </Link>
    </div>
  );
};

export default Profile;
