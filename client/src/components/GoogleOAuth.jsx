import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const GoogleOAuth = () => {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/";
      }

      dispatch(signInSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="w-full py-2 bg-gray-100 text-gray-950 border border-gray-100 transition-all font-medium text-lg rounded-lg hover:bg-opacity-80 hover:border-opacity-20">
      Continue with Google
    </button>
  );
};

export default GoogleOAuth;
