import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserStorage = ({children}) => {
  const [auth,setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!auth) navigate('/auth/login');
  },[auth]);

  return (
    <>
        <UserContext.Provider value={{auth,setAuth}}>
            {children}
        </UserContext.Provider>
    </>
  )
}
