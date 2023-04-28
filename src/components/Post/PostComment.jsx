import React, { useContext } from 'react'
import styles from './Post.module.scss'
import { Link } from 'react-router-dom'
import { FaHeart,FaComment,FaShare } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { ModalContext } from '../../context/ModalContext';

const PostComment = ({title,text,src,time,profileId}) => {


    if (!(title && profileId) ?? !src) {
        return null;
    }

  return (
    <article className={`${styles.postItemContainer} flexColumn gap-1`}>
        <Link className={styles.postProfilePicture}>
          <img src={src} alt={src ? src.slice(0,4) : ''} />
        </Link>
        <div className={styles.postContent}>
          <Link className={styles.postProfileLink}>
            <h2 className={styles.postProfileLinkTitle}>{title}</h2>
            <p className={styles.postProfileLinkId}>{profileId}
              {time && <><span className={styles.postProfileLinkIdSeparator}></span><span>{time}</span></>}
            </p>
          </Link>
          <p className={styles.postProfileDescription}>
            {text && text}
          </p>
        </div>
        <div className={`${styles.postActionOptions} flexRow gap-2 mt-1`}>
          <i><FaHeart/></i>
          <i><FaComment/></i>
          <i><FaShare/></i>
        </div>
    </article>
  )
}

export default PostComment