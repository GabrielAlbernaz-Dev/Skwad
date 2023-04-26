import React, { useContext } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import Login from './Login';
import Register from './Register';
import Brand from '../../components/Brand/Brand';
import styles from './Auth.module.scss';

const Auth = () => {
  const {auth} = useContext(UserContext);
  if(auth) return <Navigate to="/" />;
  return (
    <>
      <header className={styles.authHeader}><Brand/></header>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default Auth