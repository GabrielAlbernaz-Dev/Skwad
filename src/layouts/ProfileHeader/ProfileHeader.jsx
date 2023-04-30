import React, { useContext } from 'react'
import styles from './ProfileHeader.module.scss'
import MediumButton from '../../components/Button/MediumButton'
import { ModalContext } from '../../context/ModalContext'
import profilePhoto from '../../assets/profile-photo.jpeg'

const ProfileHeader = () => {
  const {modalSettings} = useContext(ModalContext);
  return (
    <header className={styles.profileHeader}>
        <section className={styles.profileHeaderInfo}>
            <div className={styles.profileHeaderPhotoContainer}>
                <img src={profilePhoto} alt="" />
            </div>
            <div className={styles.profileHeaderContent}>
                <h2 className={styles.profileHeaderName}>Gabriel Albernaz</h2>
                <h4 className={styles.profileHeaderUsername}>@p0nzulol</h4>
                <div className={styles.profileHeaderUserData}>
                    <div className={styles.profileHeaderUserDataItem}>
                    <span className={styles.profileHeaderUserDataItemNumber}>1,489</span>
                        <p className={styles.profileHeaderUserDataItemText}>Following</p>
                    </div>
                    <div className={styles.profileHeaderUserDataItem}>
                        <span className={styles.profileHeaderUserDataItemNumber}>52</span>
                        <p className={styles.profileHeaderUserDataItemText}>Followers</p>
                    </div>
                    <div className={styles.profileHeaderUserDataItem}>
                        <span className={styles.profileHeaderUserDataItemNumber}>2</span>
                        <p className={styles.profileHeaderUserDataItemText}>Likes</p>
                    </div>
                </div>
                <p className={styles.profileHeaderBio}>Lorem ipsum dolor sit amet consectetur adipiscing </p>
            </div>
        </section>
        <section className={styles.profileHeaderActions}>
            <MediumButton onClick={modalSettings.handleModal} data-modal-component="edit-profile" primary={true} text="Edit Profile"/>
        </section>
    </header>
  )
}

export default ProfileHeader