import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const useSignIn = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const userBool = user ? true : false;

    const signInWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            navigate("/");
        }catch(err){
            console.log(err);
            navigate("/error")
        }
    };

    return{ signInWithGoogle, user, userBool }
}