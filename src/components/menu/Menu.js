import styles from './Menu.module.css'
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import {onAuthStateChanged,signOut} from 'firebase/auth'
import {Link} from 'react-router-dom'
function Menu(props){
  const [showcrypto,setShowcrypto]=useState(false);

  const [ShowMessage,setShowMessage]=useState(false)

  const [User, setUser]=useState()
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
   signOut(auth);
  }, [])

   
    return(
      <div className='wrapper'>  
    <section className={styles.menu}>
    <div className={styles.wrapper}>
    <div className='Crypto'>
       <button className={styles.crypto}>
        <p onClick={()=>setShowcrypto(!showcrypto)}>crypto <i className='fa-solid fa-arrow-down'></i></p>
        {
        showcrypto?<ul className='toggle-down' type="none">
          <div className={styles.line2}/>
          <li  style={{gap:'10px'}}>
            
            <p> <Link style={{color:'black', textDecoration:'none'}} to="/etherium">Etherium</Link></p>
            
          </li>          
          <div className={styles.line2}/>
          <li style={{gap:'77px'}}>
            
            <p ><Link style={{color:'black', textDecoration:'none'}} to="/BNB">BNB</Link></p>
  
          </li>
          <div className={styles.line2}/>
          {User?<li>
            
            <p> <Link style={{color:'black', textDecoration:'none'}} to="/BTC">Bitcoin</Link></p>
          
            </li>:<p style={{fontSize:'21px', fontWeight:'400'}}>you have to be logged in</p>}
        </ul>:null
        }
      </button>
      </div>
      {User?
        <p style={{margin:'0'}}><Link className={styles.All} to="/All">All</Link>
        </p>
        :<button onClick={()=>setShowMessage(current=>!current)}><p>all</p></button>
      }
      {ShowMessage?<div onClick={()=> setShowMessage(false)} style={{backgroundColor: '#46507c',border: '2px solid black',borderRadius: '20px',position: 'absolute',zIndex: '1',display:'flex',flexDirection:'column',alignItems:'center', top:'20%'}}><h2>You have to be logged in to use this function</h2><h3>Click to close</h3></div>:null}
    </div>
    </section>
    
    </div>
    )
}
export default Menu

