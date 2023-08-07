import { useSignIn } from "../hooks/useSignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export const Account = () => {
  const { signInWithGoogle } = useSignIn();
  const [user] = useAuthState(auth);

  const logOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <div className="signInInfo">
        {user ? (
          <div>
            <p>Currently Signed in as: {user.displayName}</p>
            <button onClick={logOut}>logout</button>
          </div>
        ) : (
          <div>
            <p> Sign In With Google To Continue </p>
            <button onClick={signInWithGoogle}> Sign In With Google </button>
          </div>
        )}
      </div>
    </>
  );
};
