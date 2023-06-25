import React from 'react'
import styles from './Auth.module.scss'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query';
import { AiOutlineMail} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Head from '../../helper/Head';
import { useState } from 'react';
import AuthFormText from '../../components/Form/AuthFormText';
import MediumButton from '../../components/Button/MediumButton';
import { sendEmailChangePassword } from '../../data/user';

const ForgotPassword = () => {
    const { register,handleSubmit, watch,reset, formState: { errors } } = useForm();
    const [emailSent,setEmailSent] = useState(false);

    const [fieldStates, setFieldStates] = useState({
        email: false
    });

    const mutation = useMutation(async (formData) => {
        try {
          console.log(formData)
          await sendEmailChangePassword(formData.email);
        } catch (error) {
          throw new Error(error.message);
        }
      }, {
        onSuccess: (result) => {
            reset();
            setEmailSent(true);
        },
        onError: (error) => {
          console.log(error);
          console.log(error.errors[0].message);
          setEmailSent(false);
        },
        onSettled: (data, error) => {
          console.log(data);
          console.log(error);
        }
    });

    function onSubmit(data) {
        mutation.mutate(data);
    }
    
    function handleClickInput(field) {
        setFieldStates((prevState) => ({
            ...prevState,
            [field]: true,
        }));
    }
    
    function handleBlurInput() {
        setFieldStates({
            password: false,
            confirmPassword: false,
        });
    }
    
    return (
        <section className={styles.authFormContainer}>
            <Head title="Forgot Password" description="Forgot Password"/>
            <form className={`${styles.authForm}`} onSubmit={handleSubmit(onSubmit)}>
                <AuthFormText
                    title="Enter your email to validate"
                    subtitle="Then check your email for the link to change your password"
                    containerStyle={styles.authTextContainer}
                    titleStyle={styles.authFormTitle}
                    subtitleStyle={styles.authFormSubTitle}
                />
                <section onBlur={handleBlurInput} onClick={() => handleClickInput('email')} className={`${styles.authGroupControl} ${fieldStates.email ? 'inputAuthActive' : ''}`}>
                    <div className={`${styles.authIconControl} ${fieldStates.email ? 'inputAuthActive' : ''}`}>
                    <AiOutlineMail/>
                    </div>
                    <input className={styles.authControl} type="email" placeholder="Email" {...register('email')}/>
                </section>
                <MediumButton type="submit" primary={true} text="Change"/>
                <div>
                    <Link className={styles.authRedirectLink} to="/auth/login">Back to Sign In!</Link>
                    {mutation.isError && <p className="error-message">{mutation.error.message.replace('Firebase:','').trim('')}</p>}
                    {emailSent && <p className="success-message">
                        A message has been sent to your email with a link to change your password!
                    </p> }
                </div>
            </form>
        </section>
    )
}

export default ForgotPassword