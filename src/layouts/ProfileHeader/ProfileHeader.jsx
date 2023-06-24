import React, { useContext, useState } from 'react'
import styles from './ProfileHeader.module.scss'
import MediumButton from '../../components/Button/MediumButton'
import { ModalContext } from '../../context/ModalContext'
import defaultPhoto from '../../assets/default-avatar.jpg'
import ModalImagePreview from '../../components/Modal/ModalImagePreview'

const ProfileHeader = ({name,src,username,following,followers,likes,description,profileLogged,isFollowing,handleFollow}) => {
  const {modalSettings} = useContext(ModalContext);
  const [showImageModal, setShowImageModal] = useState(false);

  function handleViewProfilePhoto() {
    setShowImageModal(true);
  }

  return (
    <header className={styles.profileHeader}>
        <section className={styles.profileHeaderInfo}>
            <div className={styles.profileHeaderPhotoContainer}>
                <ModalImagePreview src={src ? src : defaultPhoto} show={showImageModal} setShowModal={setShowImageModal}/>
                <img className={styles.profileHeaderPhoto} onClick={handleViewProfilePhoto} src={src ? src : defaultPhoto} alt="" />
            </div>
            <div className={styles.profileHeaderContent}>
                <h2 className={styles.profileHeaderName}>{name}</h2>
                <h4 className={styles.profileHeaderUsername}>@{username}</h4>
                <div className={styles.profileHeaderUserData}>
                    <div className={styles.profileHeaderUserDataItem}>
                    <span className={styles.profileHeaderUserDataItemNumber}>{following}</span>
                        <p className={styles.profileHeaderUserDataItemText}>Following</p>
                    </div>
                    <div className={styles.profileHeaderUserDataItem}>
                        <span className={styles.profileHeaderUserDataItemNumber}>{followers}</span>
                        <p className={styles.profileHeaderUserDataItemText}>Followers</p>
                    </div>
                    <div className={styles.profileHeaderUserDataItem}>
                        <span className={styles.profileHeaderUserDataItemNumber}>{likes}</span>
                        <p className={styles.profileHeaderUserDataItemText}>Likes</p>
                    </div>
                </div>
                <p className={styles.profileHeaderBio}>{description}</p>
            </div>
        </section>
        <section className={styles.profileHeaderActions}>
            {profileLogged ? 
                <MediumButton onClick={modalSettings.handleModal} data-modal-component="edit-profile" primary={true} text="Edit Profile"/>
                : 
                <MediumButton onClick={handleFollow} primary={true} text={isFollowing ? 'Unfollow' : 'Follow'}/> 
            }
        </section>
    </header>
  )
}

export default ProfileHeader