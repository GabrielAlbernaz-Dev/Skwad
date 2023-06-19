import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Profile.module.scss';
import { ModalContext } from '../../context/ModalContext';
import MediumButton from '../../components/Button/MediumButton';
import { changeEmailAndPassword } from '../../data/user';
import { UserContext } from '../../context/UserContext';

const EditProfile = () => {
  const { modalSettings } = useContext(ModalContext);
  const {profileInfo} = useContext(UserContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    const {email,password} = data;
    if(email.length > 0 || password.length > 0) {
      await changeEmailAndPassword(profileInfo?.userId, email, password);
    }
  };

  function validateConfirmPassword(value) {
    if (password) {
      return value === password || 'Passwords do not match';
    }
    return true;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.profileEditContainer}>
      <h2 className={styles.profileEditTitle}>Edit Profile Data</h2>
      <input className="controlDefault" type="text" placeholder="Name" {...register('name')} />
      <input className="controlDefault" type="email" placeholder="Email" {...register('email')} />
      <input className="controlDefault" type="password" placeholder="Password" {...register('password')} />
      <input className="controlDefault" type="password" placeholder="Confirm Password" {...register('confirmPassword', { 
        validate: validateConfirmPassword
      })} />
      <textarea className="controlDefault scrollbarPrimary" placeholder="Bio" {...register('bio')} />
      <div className={styles.profileSubmitContainer}>
        <MediumButton onClick={modalSettings.closeModal} style={{ border: '1px solid #ccc' }} text="Cancel" />
        <MediumButton primary={true} type="submit" text="Save" />
      </div>
      {errors.password && <p className="error-message">Password is required</p>}
      {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
    </form>
  );
};

export default EditProfile;
