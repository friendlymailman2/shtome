import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
  id: string;
  userID: string;
  postText: string;
  username: string;
}
export const Main = () => {
  const navigate = useNavigate();
  const postRef = collection(db, "Posts");
  const [postsList, setPostsList] = useState<Post[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="center">SHTOME</h1>
      <div>
        {postsList?.map((post) => (
          <Post post={post} />
        ))}
      </div>
      <div className="postButtonContainer">
        <button className="postButton" onClick={() => navigate("/createpost")}>
          +
        </button>
      </div>
    </>
  );
};
