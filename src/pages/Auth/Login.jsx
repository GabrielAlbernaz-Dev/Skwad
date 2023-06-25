import React, { useContext } from 'react'
import heroLogin from '../../assets/login-hero-image.svg'
import { UserContext } from '../../context/UserContext'
import styles from './Auth.module.scss';
import Head from '../../helper/Head'
import AuthForm from '../../components/Form/AuthForm'

const Login = () => {
  return (
    <section className={styles.authFormContainer}>
      <Head title="Login" description="Login page"/>
      <AuthForm title="Sign In with your account" subtitle="Connect and enjoy all the features of skwad"/>
      <img className={styles.authLoginImage} src={heroLogin} alt="" />
    </section>
  )
}

export default Login