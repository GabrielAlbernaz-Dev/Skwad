import React, { useContext, useState } from 'react'
import AuthFormText from './AuthFormText'
import MediumButton from '../Button/MediumButton'
import styles from './Form.module.scss'
import formStyles from '../../pages/Auth/Auth.module.scss';
import { AiOutlineMail,AiOutlineUser } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { DevTool } from '@hookform/devtools';
import { useMutation, useQuery } from '@tanstack/react-query';
import '../../utilities.scss';
import { UserContext } from '../../context/UserContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firebaseDb } from '../../config/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const AuthForm = ({isRegister,title,subtitle}) => {
    const {login,logout} = useContext(UserContext);
    const navigate = useNavigate();
    const [fieldStates, setFieldStates] = useState({
        email: false,
        password: false,
        name:false,
        username:false
    });
    
    const {register,handleSubmit,control} = useForm();
    const mutation = useMutation( async (formData) => {
        if (isRegister) {
            const { user } = await createUserWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
            const profileInfoRef = doc(firebaseDb, "profileInfo", user.uid);
            const profileInfoDoc = await getDoc(profileInfoRef);
            
            // User exists
            if (profileInfoDoc.exists()) {
              await updateDoc(profileInfoRef, {
                name: formData.name,
                username: formData.username,
              });
            } else { // User does not exists
              await addDoc(collection(firebaseDb, "profileInfo"), {
                name: formData.name,
                username: formData.username,
                userId: user.uid,
              });
            }
        
            return user;
        }
        return await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
        }, {
        onSuccess: (result) => {
            const { user } = result;
            login(user);
        },
        onError: (error) => {
            console.log(mutation.error.errors[0].message)
            logout();
        },
        onSettled: (data, error) => {
            console.log(mutation)
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
            email: false,
            password: false,
            name:false,
            username:false
        });
    }

    return (
        <>
            <form className={`${formStyles.authForm}`} onSubmit={handleSubmit(onSubmit)}>
                <AuthFormText
                title={title}
                subtitle={subtitle}
                containerStyle={formStyles.authTextContainer}
                titleStyle={formStyles.authFormTitle}
                subtitleStyle={formStyles.authFormSubTitle}
                />
                <section onBlur={handleBlurInput} onClick={() => handleClickInput('email')} className={`${styles.authGroupControl} ${fieldStates.email ? 'inputAuthActive' : ''}`}>
                    <div className={`${styles.authIconControl} ${fieldStates.email ? 'inputAuthActive' : ''}`}>
                    <AiOutlineMail/>
                    </div>
                    <input className={styles.authControl} type="email" placeholder="Email" {...register('email')}/>
                </section>
                <section onBlur={handleBlurInput} onClick={() => handleClickInput('password')} className={`${styles.authGroupControl} ${fieldStates.password ? 'inputAuthActive' : ''}`}>
                    <div className={`${styles.authIconControl} ${fieldStates.password ? 'inputAuthActive' : ''}`}>
                    <BsKey/>
                    </div>
                    <input className={styles.authControl} type="password" placeholder="Password" {...register('password')}/>
                </section>
                {
                isRegister ?
                    (
                    <>
                        <section onBlur={handleBlurInput} onClick={() => handleClickInput('name')} className={`${styles.authGroupControl} ${fieldStates.name ? 'inputAuthActive' : ''}`}>
                            <div className={`${styles.authIconControl} ${fieldStates.name ? 'inputAuthActive' : ''}`}>
                            <AiOutlineUser/>
                            </div>
                            <input className={styles.authControl} type="text" placeholder="Name" {...register('name')}/>
                        </section>
                        <section onBlur={handleBlurInput} onClick={() => handleClickInput('username')} className={`${styles.authGroupControl} ${fieldStates.username ? 'inputAuthActive' : ''}`}>
                            <div className={`${styles.authIconControl} ${fieldStates.username ? 'inputAuthActive' : ''}`}>
                            @
                            </div>
                            <input className={styles.authControl} type="text" placeholder="Username" {...register('username')}/>
                        </section>
                    </>
                    ) :
                    ''
                }
                <MediumButton type="submit" primary={true} text={isRegister ? 'Register' : 'Login'}/>
                {isRegister ? <Link className={formStyles.authRedirectLink} to="/auth/login">Already have an account? Sign in now</Link> : <Link className={formStyles.authRedirectLink} to="/auth/register">You does not have an account? Register here</Link>}
                {mutation.isError && <p className="error-message">{mutation.error.message.replace('Firebase:','').trim('')}</p>}
            </form>
            <DevTool control={control}/>
        </>
    )
}

export default AuthForm