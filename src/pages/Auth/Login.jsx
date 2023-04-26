import React, { useContext } from 'react'
import MediumButton from '../../components/Button/MediumButton'
import heroLogin from '../../assets/login-hero-image.svg'
import {BsKey} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import { UserContext } from '../../context/UserContext'
import Input from '../../components/Form/Input';
import Form from '../../components/Form/Form';
import styles from './Auth.module.scss';
import AuthInput from '../../components/Form/AuthInput'
import { Link } from 'react-router-dom'

const Login = () => {
  const {setAuth} = useContext(UserContext);
  function handleLogin() {
    setAuth(true)
  }

  return (
    <section className={styles.authFormContainer}>
      <Form className={styles.authForm}>
        <div className={styles.authTextContainer}>
          <h2 className={styles.authFormTitle}>Sign In with your account</h2>
          <h4 className={styles.authFormSubTitle}>Lorem ipsum dolor sit, amet consectetur dolor sit, amet.</h4>
        </div>
        <AuthInput type="text" placeholder="Email" icon={<AiOutlineMail/>}/>
        <AuthInput type="password" placeholder="Password" icon={<BsKey/>}/>
        <MediumButton onClick={handleLogin} primary={true} text="Login"/>
        <Link className={styles.authRedirectLink} to="/auth/register">You does not have an account? Register here</Link>
      </Form>
      <img className={styles.authLoginImage} src={heroLogin} alt="" />
    </section>
  )
}

export default Login