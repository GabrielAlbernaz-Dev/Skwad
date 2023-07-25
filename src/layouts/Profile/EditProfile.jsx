import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Profile.module.scss';
import { ModalContext } from '../../context/ModalContext';
import MediumButton from '../../components/Button/MediumButton';
import { changeEmailAndPassword } from '../../data/user';
import { UserContext } from '../../context/UserContext';
import { updateProfileInfos } from '../../data/profile';
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbCameraPlus } from 'react-icons/tb';
import { firebaseStorage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { b64ToBlob } from '../../helper/file';

const EditProfile = () => {
  const { modalSettings } = useContext(ModalContext);
  const navigate = useNavigate();
  const {profileInfo} = useContext(UserContext);
  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
  const [isLoading,setIsLoading] = useState(false);
  const [isEmpty,setIsEmpty] = useState(false);
  const profileBioField = useRef(null);
  const profileBioValue = watch('bio','');
  const maxCharacters = 150;
  const password = watch('password');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const isNotEmpty = Object.values(watch()).some(value => value !== '');
    if(isNotEmpty) setIsEmpty(false);
  },[watch()]);

  async function onSubmit(data) {
    const isEmpty = Object.values(data).every(value => value === '') && !selectedImage;
    if(isEmpty) {
      setIsEmpty(true);
      return
    }
    setIsLoading(true);
    const { email, password, name, bio } = data;
    const profileId = profileInfo?.id;
    try {
      if (email.length > 0 || password.length > 0) {
        await changeEmailAndPassword(profileInfo?.userId, email, password);
      }

      if (profileId) {
        if(name.length > 0 && bio.length > 0) {
          await updateProfileInfos(profileId, name, bio);
        } else if(name.length > 0) {
          await updateProfileInfos(profileId, name, null);
        } else {
          await updateProfileInfos(profileId, null, bio);
        }
      }

      if (selectedImage) {
        const imageBlob = b64ToBlob(selectedImage)
        const storageRef = ref(firebaseStorage, `profile-images/${profileId}`);
        await uploadBytes(storageRef, imageBlob);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsLoading(false);
      reset();
      modalSettings.closeModalAfterSubmit();
      navigate(0);
    }
  } 

  function handleTypePost(e) {
    const { currentTarget } = e;
    const maxLength = parseInt(currentTarget.maxLength);
    if (profileBioValue.trim('') === '' || profileBioValue.length === 0) {
      currentTarget.style.height = 'initial';
    }
    if (profileBioValue.length >= maxLength && e.key !== 'Backspace') {
      e.preventDefault();
    } else {
      currentTarget.style.height = 'auto';
      currentTarget.style.height = currentTarget.scrollHeight + 'px';
    }
  }
  
  function validateConfirmPassword(value) {
    if (password) {
      return value === password || 'Passwords do not match';
    }
    return true;
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.profileEditContainer}>
      <h2 className={styles.profileEditTitle}>Edit Profile Data</h2>
      <label htmlFor="uploadImage" className={`${styles.profileUploadImageContainer} ${selectedImage && 'has-image'}`}>
        <TbCameraPlus className={styles.profileUploadImageCam}/>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Uploaded Profile Image"
            className={styles.profileUploadedImage}
          />
        )}
        <input
          id="uploadImage"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </label>
      <input className="controlDefault" type="text" placeholder="Name" {...register('name')} />
      <input className="controlDefault" type="email" placeholder="Email" {...register('email')} />
      <input className="controlDefault" type="password" placeholder="Password" {...register('password')} />
      <input className="controlDefault" type="password" placeholder="Confirm Password" {...register('confirmPassword', { 
        validate: validateConfirmPassword
      })} />
      <div className="w-100">
        <textarea onInput={handleTypePost} ref={profileBioField} value={profileBioValue} maxLength={maxCharacters} className="controlDefault scrollbarPrimary" placeholder="Bio" {...register('bio')} />
        <p className="maxLengthBio">{profileBioValue ? profileBioValue.length : 0}/<span>{maxCharacters}</span></p>
      </div>
      <div className={styles.profileSubmitContainer}>
        <MediumButton onClick={modalSettings.closeModal} style={{ border: '1px solid #ccc' }} text="Cancel" />
        <MediumButton primary={true} type="submit" text={isLoading ? 'Sending...' : 'Save'} disabled={isLoading} />
      </div>
      {isEmpty && <p className="error-message">All fields are empty, please fill in some field to save the edit</p>}
      {errors.password && <p className="error-message">Password is required</p>}
      {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
    </form>
  );  
};

export default EditProfile;
