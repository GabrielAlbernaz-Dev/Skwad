import React, { useContext } from 'react'
import styles from './Auth.module.scss';
import Head from '../../helper/Head';
import AuthForm from '../../components/Form/AuthForm';

const Register = () => {
  return (
    <section className={`${styles.authFormContainer} ${styles.authRegisterContainerStyles}`}>
      <Head title="Register" description="Register page"/>
      <AuthForm isRegister="true" title="Create your account and have fun with skwad!"
      subtitle="Climb aboard and enjoy skwad - Create your account and enjoy!" />
    </section>
  )
}

export default Register