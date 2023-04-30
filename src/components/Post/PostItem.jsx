import React, { useContext } from 'react'
import styles from './Post.module.scss'
import { Link } from 'react-router-dom'
import { FaHeart,FaComment,FaShare } from 'react-icons/fa';
import { ModalContext } from '../../context/ModalContext';

const PostItem = ({title,text,src,time,profileId}) => {
  const {modalSettings} = useContext(ModalContext);

  if (!(title && profileId) ?? !src) {
    return null;
  }

  function handlePrimary({currentTarget}) {
    currentTarget.classList.toggle('primary')
  }

  return (
    <article className={styles.postItemContainer}>
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
        <div className={styles.postActionOptions}>
          <i onClick={handlePrimary}><FaHeart/></i>
          <i onClick={modalSettings.handleModal} data-modal-component="comment"><FaComment/></i>
          <i onClick={modalSettings.handleModal} data-modal-component="reply"><FaShare/></i>
        </div>
    </article>
  )
}

export default PostItem