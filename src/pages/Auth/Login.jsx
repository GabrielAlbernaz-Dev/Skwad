import React, { useContext } from 'react'
import MediumButton from '../../components/Button/MediumButton'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const {setAuth} = useContext(UserContext);
  function handleLogin() {
    setAuth(true)
  }

  return (
    <div>
        <MediumButton onClick={handleLogin} primary={true} text="Login"/>
    </div>
  )
}

export default Login