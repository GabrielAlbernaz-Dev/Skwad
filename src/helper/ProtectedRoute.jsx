import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({children}) => {
  const {auth} = useContext(UserContext);
  return (
    auth ? children : <Navigate to="/auth/login"/>
  )
}

export default ProtectedRoute