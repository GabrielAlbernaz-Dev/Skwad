import React, { useEffect, useState } from 'react'
import styles from './FollowList.module.scss'
import profileDefaultImage  from '../../assets/default-avatar.jpg';
import { Link } from 'react-router-dom'
import { getProfilePhotoById } from '../../helper/file';

const FollowList = ({text,accounts}) => {
    const [profileImages, setProfileImages] = useState({});

    useEffect(() => {
        async function fetchProfileImages() {
            const images = {};
            if(accounts) {
                for (const account of accounts) {
                    try {
                        const downloadUrl = await getProfilePhotoById(account.id)
                        images[account.id] = downloadUrl;
                    } catch (error) {
                        console.error(`Error fetching profile image for account ${account.id}:`, error);
                        images[account.id] = null;
                    }
                }
                setProfileImages(images);
            }
        }

        fetchProfileImages();
    }, [accounts]);

  return (
    <section className={styles.followListContainer}>
        <h1 className={styles.followListTitle}>{text}</h1>
        <ul>
            {accounts && accounts.map((account,i) => {
                return (
                    <li className={styles.followListItem} key={i}>
                        <Link to={`/profile/${account.id}`} className={styles.followListAvatar}>
                            <img src={profileImages[account.id] || profileDefaultImage} alt="" />
                        </Link>
                        <Link to={`/profile/${account.id}`} className={styles.followListText}>
                            <h5 className={styles.followListTextProfile}>{account.name}</h5>
                            <p className={styles.followListTextBio}>{'@' + account.username}</p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </section>
  )
}

export default FollowList