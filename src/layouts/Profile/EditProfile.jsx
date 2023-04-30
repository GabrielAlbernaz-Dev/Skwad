import React, { useContext } from 'react'
import styles from './Profile.module.scss'
import Input from '../../components/Form/Input'
import MediumButton from '../../components/Button/MediumButton'
import Textarea from '../../components/Form/Textarea'
import { ModalContext } from '../../context/ModalContext'

const EditProfile = () => {
  const {modalSettings} = useContext(ModalContext);

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.profileEditContainer}>
        <h2 className={styles.profileEditTitle}>Edit Profile Data</h2>
        <Input type="text" placeholder="Name"/>
        <Input type="email" placeholder="Email"/>
        <Input type="password" placeholder="Password"/>
        <Input type="password" placeholder="Confirm Password"/>
        <Textarea placeholder="Bio"/>
        <div className={styles.profileSubmitContainer}>
            <MediumButton onClick={modalSettings.closeModal} style={{border:'1px solid #ccc'}} text="Cancel"/>
            <MediumButton primary={true} text="Save"/>
        </div>
    </form>
  )
}

export default EditProfile