import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { firebaseAuth, firebaseDb } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { collection,getDocs, query, where } from 'firebase/firestore';

export const UserContext = createContext();

export const UserStorage = ({children}) => {
  const [user,setUser] = useState(null);
  const [profileInfo,setProfileInfo] = useState(null);
  const [auth,setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        await login(user);
        const profileQuery = query(collection(firebaseDb, "profileInfo"), where("userId", "==", user.uid));
        const profileDocs = await getDocs(profileQuery);
        if (!profileDocs.empty) {
          const profileDoc = profileDocs.docs[0];
          const profileData = profileDoc.data();
          const profileInfoWithId = {
            id: profileDoc.id,
            ...profileData
          };
          setProfileInfo(profileInfoWithId);
        } else {
          setProfileInfo(null);
        }
      } else {
        logout();
        setProfileInfo(null);
      }
    });
  }, [user]);

  function login(user) {
    setUser(user);
    setAuth(true);
  };

  function logout() {
    setUser(null);
    setAuth(false);
    signOut(firebaseAuth)
    .then(() => {
      navigate('/auth/login');
    })
    .catch((error) => {
      navigate('/');
    });
  };

  return (
    <>
        <UserContext.Provider value={{auth,setAuth,user,setUser,profileInfo,setProfileInfo,login,logout}}>
            {children}
        </UserContext.Provider>
    </>
  )
}
