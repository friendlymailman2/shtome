import { Link } from "react-router-dom";
import blankPfp from "../img/blankPfp.png";

import "../App.css";
import { useSignIn } from "../hooks/useSignIn";

export const Navbar = () => {
  const { signInWithGoogle, user } = useSignIn();

  return (
    <>
      <div className="navBar">
        <br />
        <div className="links">
          <Link to="/"> Home </Link>
          <br />
          <Link to="/account"> Account </Link>
          <br />
          <Link to="/createpost"> Post </Link>
        </div>

        <img
          className="pfp"
          src={user?.photoURL || blankPfp}
          alt="pfp"
          onClick={() => signInWithGoogle()}
        />
      </div>
    </>
  );
};
