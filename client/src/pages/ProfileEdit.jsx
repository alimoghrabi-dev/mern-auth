import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut,
  signOutFailure,
} from "../redux/user/userSlice";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [image, setImage] = useState(undefined);
  const [upload, setUpload] = useState(null);
  const [imgError, setImgError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { currentUser, loading } = useSelector((state) => state.user);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + image.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUpload(Math.round(progress));
      },
      (error) => setImgError(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            profilePic: downloadURL,
          });
        });
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      if (response.ok) {
        window.location.href = "/profile";
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch("/api/auth/signout");

      dispatch(signOut());
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 mt-36 sm:mt-24">
      <h1 className="text-2xl text-gray-100 font-semibold">
        Edit Your Profile
      </h1>
      <form
        onSubmit={onSubmit}
        className="w-[325px] md:w-[450px] flex items-center justify-center flex-col space-y-6">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={
            formData.profilePic ? formData.profilePic : currentUser?.profilePic
          }
          alt="profile picture"
          className="w-24 h-24 object-cover object-center rounded-full shadow shadow-violet-500/50 transition-all hover:opacity-85 cursor-pointer"
        />
        {imgError ? (
          <p className="text-red-500 text-lg font-medium">
            Error Uploading Image, Try again
          </p>
        ) : upload > 0 && upload < 100 ? (
          <p className="text-gray-100 text-lg font-medium">
            Uploading... {upload}%
          </p>
        ) : upload === 100 ? (
          <p className="text-lg text-green-500 font-medium">Upload Complete</p>
        ) : null}
        <input
          onChange={handleChange}
          type="text"
          name="username"
          placeholder={currentUser?.username}
          className="bg-gray-950 mb-2 w-full py-1.5 px-4 border placeholder:text-gray-400 placeholder:text-sm text-base font-medium border-gray-600/50 text-gray-100 rounded-lg hover:shadow-md hover:shadow-gray-100/20 focus:ring-2 focus:ring-gray-100/60 focus:ring-offset-2 focus:ring-offset-gray-950 outline-none transition-all"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder={currentUser?.email}
          className="bg-gray-950 mb-2 w-full py-1.5 px-4 border placeholder:text-gray-400 placeholder:text-sm text-base font-medium border-gray-600/50 text-gray-100 rounded-lg hover:shadow-md hover:shadow-gray-100/20 focus:ring-2 focus:ring-gray-100/60 focus:ring-offset-2 focus:ring-offset-gray-950 outline-none transition-all"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="New Password"
          className="bg-gray-950 w-full py-1.5 px-4 border placeholder:text-sm text-base font-medium border-gray-600/50 text-gray-100 placeholder:text-gray-500 rounded-lg hover:shadow-md hover:shadow-gray-100/20 focus:ring-2 focus:ring-gray-100/60 focus:ring-offset-2 focus:ring-offset-gray-950 outline-none transition-all"
        />
        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 bg-gray-600 text-gray-50 text-base font-medium rounded-lg transition-all hover:bg-opacity-80">
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
      <span className="w-[325px] md:w-[450px] flex items-center justify-between px-2">
        <button className="text-red-500 text-base font-medium underline underline-offset-1">
          Delete Account
        </button>
        <button
          onClick={handleSignout}
          className="text-red-500 text-base font-medium">
          Sign Out
        </button>
      </span>
    </div>
  );
};

export default ProfileEdit;
