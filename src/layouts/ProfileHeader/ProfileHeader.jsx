import React from 'react'
import styles from './ProfileHeader.module.scss'
import { Link } from 'react-router-dom'
import SmallButton from '../../components/Button/SmallButton'
import MediumButton from '../../components/Button/MediumButton'
import { FaRegEdit, FaShare } from 'react-icons/fa'
import { TbShare3 } from 'react-icons/tb'

const ProfileHeader = () => {
  return (
    <header className={styles.profileHeader}>
        <section className={styles.profileHeaderInfo}>
            <div className={styles.profileHeaderPhotoContainer}>
                <img src="https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1692535679086598~c5_100x100.jpeg?x-expires=1681354800&x-signature=eG6E5Sx7iZZcCCYHcnh2suPGdYA%3D" alt="" />
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
                        <span className={styles.profileHeaderUserDataItemNumber}>20</span>
                        <p className={styles.profileHeaderUserDataItemText}>Followers</p>
                    </div>
                    <div className={styles.profileHeaderUserDataItem}>
                        <span className={styles.profileHeaderUserDataItemNumber}>199</span>
                        <p className={styles.profileHeaderUserDataItemText}>Likes</p>
                    </div>
                </div>
                <p className={styles.profileHeaderBio}>Lorem ipsum dolor sit amet consectetur adipiscing </p>
            </div>
        </section>
        <section className={styles.profileHeaderActions}>
            <MediumButton primary={true} text="Edit Profile"/>
        </section>
    </header>
  )
}

export default ProfileHeader