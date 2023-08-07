import { Post as postInterface } from "./main";
import {
  getDocs,
  addDoc,
  collection,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSignIn } from "../../hooks/useSignIn";
import { useEffect, useState } from "react";

interface Props {
  post: postInterface;
}

interface Like {
  likeID: string;
  userID: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const { user } = useSignIn();

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "Likes");

  const likesDoc = query(likesRef, where("postID", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userID: doc.data().userID, likeID: doc.id }))
    );
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userID: user?.uid,
        postID: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userID: user?.uid, likeID: newDoc.id }]
            : [{ userID: user?.uid, likeID: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postID", "==", post.id),
        where("userID", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "Likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeID !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userID == user?.uid);
  const hasUserPosted = () => {
    return post.userID == user?.uid;
  };

  const postsRef = collection(db, "Posts");
  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "Posts", post.id));
      const likeToDeleteQuery = query(likesRef, where("postID", "==", post.id));
      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const deletePromises = likeToDeleteData.docs.map(async (likeDoc) => {
        const likeToDlete = doc(db, "Likes", likeDoc.id);
        await deleteDoc(likeToDlete);
      });

      await Promise.all(deletePromises);
    } catch (err) {
      console.log(err);
    }

    window.location.reload();
  };

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div className="postBox">
      <div className="postTopBar">
        <h1 className="postTitle">{post.username}</h1>
        {hasUserPosted() ? (
          <button className="deletePostButton" onClick={deletePost}>
            ❌
          </button>
        ) : (
          <></>
        )}
      </div>
      <p className="postText">{post.postText}</p>
      <div className="likesDiv">
        <button
          className="likeButton"
          onClick={hasUserLiked ? removeLike : addLike}
        >
          {hasUserLiked ? <>👎</> : <>👍</>}
        </button>
        {likes ? (
          <p className="likesNum">{likes?.length}</p>
        ) : (
          <p className="likesNum">0</p>
        )}
      </div>
    </div>
  );
};
