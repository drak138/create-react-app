import { useEffect,useState } from "react";
import { Auth, onAuthStateChanged } from "firebase/auth";
export const AuthDetails=()=>{
    const[authUser, setauthUser]=useState([]);
    
    useEffect(()=>{
   const listener=onAuthStateChanged(auth, (user)=>{
    if (user){
        setauthUser(user)
        console.log(authUser)
    }
    else{
        setauthUser(null)
    }
   })
    },[])
}
