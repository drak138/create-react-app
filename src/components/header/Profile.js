import styles from './header.module.css'
import {useEffect, useState} from 'react';
import { db, auth} from '../../firebase';
import {setDoc, doc, getDoc, deleteDoc, updateDoc,} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut, deleteUser, updatePassword, updateEmail,sendPasswordResetEmail,updateProfile} from 'firebase/auth'
import validator from 'validator'
import { async } from '@firebase/util';
import { Routes,Route,Link} from 'react-router-dom';

export const RegisterForm = (props)=>{
    const[DocUid,setDocUid]=useState('')
    const[regUsername,setRegUsername]=useState("")

    const [emailError, setEmailError] = useState('')

    const[userP,setUserP]=useState('')



    const[follow,setFollow]=useState(false)

    const [delUser,setDelUser]=useState('')

    const[followingEth,setFollowingEth]=useState(Boolean)



    const[followingBNB,setFollowingBNB]=useState(Boolean)

    const [loading, setLoading] = useState(true);

    const[followingBTC,setFollowingBTC]=useState(Boolean)

    const[userEdit,setUserEdit]=useState('')

    const[confirmPass2,setConfirmPass2]=useState('')

    const[expand, setExpand]=useState(false)

    const[showChangePass, setShowChangePass]=useState(false)

    const[regPassword,setRegPassword]=useState('')

    const[confirmPass,setConfirmPass]=useState('')

    const[regEmail,setRegEmail]=useState('')

    const[loginPassword,setLoginPassword]=useState('')

    const[loginEmail,setLoginEmail]=useState('')

    const [CurUser, setUser]=useState('')

    const [userN,setUserN]=useState('')

    const[userE,setUserE]=useState('')

    const [logisClicked,setlogisClicked]=useState(false);

   const [regisClicked,setregisClicked]=useState(false);

  const [ErrorM, setError]=useState('')

  const[showPass,setShowPass]=useState(false)
  
  const[passType,setPassType]=useState("password")

  const[showPass2,setShowPass2]=useState(false)

  const[passType2,setPassType2]=useState("password")

  const[showPass3,setShowPass3]=useState(false)

  const[passType3,setPassType3]=useState("password")
  const [forgot,setForgot]=useState(false)

  const[showDel,setShowDel]=useState(false)

  const[authUser, setauthUser]=useState([]);

    
    useEffect(()=>{
   const listener= onAuthStateChanged(auth, (user)=>{
    if (user){
        setauthUser(user)
    }
    else{
        setauthUser(null)
    }
   })
    },[])
  const register= async ()=>{
    setregisClicked(current=>!current)
      try{
     const user = await createUserWithEmailAndPassword(auth, regEmail, regPassword, regUsername)
     await setDoc(doc(db, "Users",user.user.uid ), {displayName: regUsername, Email: regEmail, Password: regPassword, followedEtherium:false,followedBNB:false, followedBtc:false})
     const docRef=(doc(db,"Users",user.user.uid))
     await updateProfile(auth.currentUser, {
        displayName: regUsername
      }).then(() => {
        // Profile updated!
        // ...
        props.setLoading(false)
      }).catch((error) => {
        // An error occurred
        // ...
      });
     const docName= await getDoc(docRef)
     setFollowingBNB(docName.data().followedBNB)
     setFollowingEth(docName.data().followedEtherium)
     setFollowingBTC(docName.data().followedBtc)
     setDocUid(docRef)
     setUserEdit(docRef)
     setDelUser(docRef)
     setUserN(docName.data().displayName)
     setUserE(docName.data().Email)
     setUserP(docName.data().Password)
     setPassType("password")
     setShowPass(false)
     setPassType2("password")
     setShowPass2(false)
     setPassType3("password")
     setShowPass3(false)
 }catch (error){
         console.log(error.message)
 }
 
     onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
       })
       setShowPass(false)
       console.log(authUser)
 }


  const ForgotPass=async()=>
  {
    setlogisClicked(false)
    setForgot(true)
  }

  const SendEmail=async()=>{
    try{
      await sendPasswordResetEmail(auth, loginEmail)
 .then(() =>
     {
      setForgot(false)
      setlogisClicked(true)
      setError('')
     }
     ).catch((error)=>
     {
   console.log(error.message)
   if(error.message===("Firebase: Error (auth/user-not-found).")){
    setError("Wrong user E-mail")}
    else if(error.message===("Firebase: Error (auth/invalid-email).")){
      setError("Invalid E-mail")
    }
    })
  }catch(error){
    console.log(error.message) 
}
}
const handleReg=()=>{
    setForgot(false)
    setlogisClicked(false)
    setregisClicked(current=>!current)
    setError('')
  }
  const handleLog=()=>{
    setForgot(false)
    setlogisClicked(current=>!current)
    setregisClicked(false)
    setError('')
  }
  const closeReg=()=>{
    setregisClicked(false)
    setPassType("password")
    setShowPass(false)
    setPassType2("password")
    setShowPass2(false)
    setRegUsername("")
    setRegEmail("")
    setRegPassword("")
    setConfirmPass("")
    setConfirmPass2("")
    setError("")
  }
  const togglePassword=()=>{
    setShowPass(current=>!current)
    if(showPass){
      setPassType("password")
    }
    else{
      setPassType("text")
    }
     }
     const togglePassword2=()=>{
        setShowPass2(current=>!current)
        if(showPass2){
          setPassType2("password")
        }
        else{
          setPassType2("text")
        }
       } 
return(
    <header>
        <button className={styles.button} onClick={handleReg} href="Register">Register</button>
        {regisClicked?
            <div className={styles.register}>
                 <div>
                 <i onClick={closeReg} style={{cursor:'pointer', position:'absolute',top:'1%',left:'96%'}} className="fa-solid fa-x"></i>
                     <div>
                         <label htmlFor="username">Username:</label>
                         <input 
                          id="username" 
                          type="text" 
                          onChange={e=>setRegUsername(e.target.value)} 
                          value={regUsername}
                          name="username"/>
                     </div>
                     <div>
                         <label htmlFor="email">Email:</label>
                         <input 
                          id="email" 
                          type="email" 
                          onChange={e=>setRegEmail(e.target.value)} 
                          value={regEmail} 
                          name="email"/>
                     </div>
                     <div>
                         <label htmlFor="password">Password:</label>
                         <div style={{width: '97%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}><input 
                           id="password" 
                           type={passType} 
                           onChange={(e)=>setRegPassword(e.target.value)} 
                           value={regPassword} 
                           name="password" onBlur={()=>setRegPassword(regPassword)}
                           style={{borderWidth:'0px', outline:'none',backgroundColor:'transparent'}}/>
                           {showPass?
                           <button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>
                           :<button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>}
                           </div>
                     </div>
                     <div style={{display:'flex', gap:'0'}}>
                         <label style={{marginBottom:'1rem'}} htmlFor="confirmpassword">Confirm Password:</label>
                         <div style={{width: '97%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}>
                         <input 
                         id="confirmpassword" 
                         type={passType2}
                         onChange={(e)=>setConfirmPass(e.target.value)} 
                         value={confirmPass} 
                         onBlur={()=>setConfirmPass(confirmPass)}
                         style={{borderWidth:'0px', outline:'none',backgroundColor:'transparent'}}/>
                         {showPass2?
                           <button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword2}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>
                           :<button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword2}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>}
                         </div>
                         {
                         confirmPass?<div>{confirmPass!==regPassword? <p style={{color:'red', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords do not match</p>:null}
                         {confirmPass===regPassword? <p style={{color:'green', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords Match</p>:null}</div>:null
                         }
                     </div>
                     <p onClick={handleLog} style={{margin:'0',color:'blue',cursor:'pointer'}}>Already have an account</p>
                     {confirmPass===regPassword?<div>
                         <button style={{color:'white', backgroundColor:'transparent', border:'none'}} onClick={register}>Register</button>
                     </div>:
                     <div><button >Register</button></div>}
                 </div>
             </div>:null}
    </header>
)
}