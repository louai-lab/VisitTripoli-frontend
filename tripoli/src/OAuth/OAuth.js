import React , {useContext} from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from './firebase.js';
import style from "./OAuth.module.css"
import googleIcon from "../images/google.png";
import axios from 'axios';
import UserContext from '../useContext/userContext.js';

import { useNavigate } from 'react-router-dom';

export default function OAuth({ signup }) {

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
    const handleGoogleClick = async ()=>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)
            console.log(result);
            const res = await axios.post('http://localhost:4000/loginWithGoogle', {
                name: result.user.displayName,
                role: "guide",
                email: result.user.email, 
                image: result.user.photoURL
            })
            setUser(res.data)
            localStorage.setItem('userData', JSON.stringify(true));
            console.log(res.data)
            navigate("/home");
            console.log("Worked!")
        } catch (error) {
            console.log("could not sign in with google")
            console.log(error)
        }
    }
  return (
    <div className={style.googleButton} onClick={handleGoogleClick}>
      <img
        src={googleIcon}
        alt="Google Icon"
        className={style.googleIcon}
      />
      <p className={style.slogan}>{signup ? "Sign up" : "Sign in"} with Google</p>
    </div>
  )
}