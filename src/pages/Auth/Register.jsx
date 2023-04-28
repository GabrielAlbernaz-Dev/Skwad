import React, { useContext } from 'react'
import MediumButton from '../../components/Button/MediumButton'
import {BsKey} from 'react-icons/bs'
import {AiOutlineMail,AiOutlineUser} from 'react-icons/ai'
import Form from '../../components/Form/Form';
import styles from './Auth.module.scss';
import AuthInput from '../../components/Form/AuthInput'
import { Link, useNavigate } from 'react-router-dom'
import AuthFormText from '../../components/Form/AuthFormText'
import Head from '../../helper/Head';

const Register = () => {
  const navigate = useNavigate();
  return (
    <section className={`${styles.authFormContainer} ${styles.authRegisterContainerStyles}`}>
      <Head title="Register" description="Register page"/>
      <Form className={`${styles.authForm} ${`max-form`}`}>
        <AuthFormText
         title="Create your account and have fun with skwad!"
         subtitle="Lorem ipsum dolor sit, amet consectetur dolor sit, amet."
         containerStyle={styles.authTextContainer}
         titleStyle={styles.authFormTitle}
         subtitleStyle={styles.authFormSubTitle}
        />
        <AuthInput type="email" placeholder="Email" icon={<AiOutlineMail/>}/>
        <AuthInput type="text" placeholder="Name" icon={<AiOutlineUser/>}/>
        <AuthInput type="password" placeholder="Password" icon={<BsKey/>}/>
        <MediumButton onClick={() =>{navigate('/auth/login')}} primary={true} text="Register"/>
        <Link className={styles.authRedirectLink} to="/auth/login">Already have an account? Sign in now</Link>
      </Form>
    </section>
  )
}

export default Register