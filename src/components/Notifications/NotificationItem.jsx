import React, { useEffect, useState } from 'react'
import { FaHeart,FaComment } from 'react-icons/fa';
import styles from './Notifications.module.scss'
import { Link,useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseDb } from '../../config/firebase';

const NotificationItem = ({type,postId,userPostId,name,src}) => {
    const [profileId,setProfileId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfileId() {
            const profileQuery = query(collection(firebaseDb, "profileInfo"), where("userId", "==", userPostId));
            const profileDocs = await getDocs(profileQuery);
            if (!profileDocs.empty) {
                const profileDoc = profileDocs.docs[0];
                setProfileId(profileDoc.id)
            }
        }
        fetchProfileId();
    }, []);

    function handlePostNavigate(e) {
        if (e.target.nodeName === 'A' || e.target.parentNode.nodeName === 'A') {
            return;
          }
        navigate(`/posts/${postId}`);
    }

  return (
    <article onClick={handlePostNavigate} className={styles.notificationItem}>
        <div className={styles.notificationItemContent}>
            <Link to={`/profile/${profileId}`} className={styles.notificationItemProfileImg}>
                <img src={src} alt={src} />
            </Link>
            <p className={styles.notificationItemText}>
                <span className={styles.notificationItemProfileText}>{name}</span> {type.includes('like') ? 'liked' : 'comment on'} your post.
            </p>
        </div>
        <div className={styles.notificationItemIcon}>
            {type.includes('like') ? <FaHeart/> : <FaComment />}
        </div>
    </article>
  )
}

export default NotificationItem