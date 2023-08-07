import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSignIn } from "../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  postText: string;
}

export const CreateForm = () => {
  const navigate = useNavigate();
  const { user } = useSignIn();
  const schema = yup.object().shape({
    postText: yup.string().required("Text Required"),
  });

  const postsRef = collection(db, "Posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userID: user?.uid,
    });

    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(onCreatePost)} className="postForm">
      <textarea
        className="postTextInput"
        placeholder="Text..."
        {...register("postText")}
      />
      <p className="errorText">{errors.postText?.message}</p>
      <br />
      <input type="submit" className="submitButton" />
    </form>
  );
};
