import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({children}) => {
  const {auth} = useContext(UserContext);
  if(auth === false) {
    <Navigate to="/auth/login"/>
    return <h2 className="redirectTitle">Redirect...</h2>;
  }
  return (
    children
  )
}

export default ProtectedRoute