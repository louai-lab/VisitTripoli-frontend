// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../fireBase";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {

//     const [user, setUser]= useState({})

//   const googleSignIn =  async() => {
//     const provider = new GoogleAuthProvider();
    
//     try{
//         await signInWithPopup(auth, provider);
//     }
//     catch(error){
//         console.error(error)
//     }
//   };

//   useEffect(()=>{
//     const unsubscribe = onAuthStateChanged(auth , (currentUser) =>{
//         setUser(currentUser)
//         console.log("User" , currentUser)
//     })
//     return()=>{
//         unsubscribe()
//     }
//   },[])

//   return (
//     <AuthContext.Provider value={{ googleSignIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
