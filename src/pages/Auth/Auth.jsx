import React, { useContext } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const {auth} = useContext(UserContext);
  if(auth) return <Navigate to="/" />;
  return (
    <>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </>
  )
}

export default Auth