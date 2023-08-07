import { CreateForm } from "./create-form";
import { useSignIn } from "../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const CreatePost = () => {
  const { userBool } = useSignIn();
  const navigate = useNavigate();
  const checkLoggedIn = () => {
    if (!userBool) {
      navigate("/account");
      alert("Must be Logged in to Post");
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      <CreateForm />
    </>
  );
};
