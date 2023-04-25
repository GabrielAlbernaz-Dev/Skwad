import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const ProtectedComponent = ({children}) => {
    const {auth} = useContext(UserContext);
    if(!auth) return null
    return children
}

export default ProtectedComponent