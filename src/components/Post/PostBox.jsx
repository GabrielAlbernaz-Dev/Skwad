import React, { useEffect, useRef, useState } from 'react'
import styles from './Post.module.scss'
import { Link } from 'react-router-dom'
import SmallButton from '../Button/SmallButton'
import { FaImage } from 'react-icons/fa';
import { BsEmojiSmileFill } from 'react-icons/bs';
import PostInputFile from './PostInputFile';
import PostEmoji from './PostEmoji';

const PostBox = ({src,alt,placeholder}) => {  
  const maxCharacters = 300;
  const [postFieldValue,setPostFieldValue] = useState('');
  const postFieldRef = useRef(null);

  useEffect(()=>{
    if(postFieldValue.length === 0) {
        postFieldRef.current.style.height = 'initial';
    }
  },[postFieldValue])

  function handleTypePost(e) {
    const {currentTarget} = e;
    const maxLength = parseInt(currentTarget.maxLength);
    setPostFieldValue(currentTarget.value);
    if(postFieldValue.trim('') === '' || postFieldValue.length == 0) {
        currentTarget.style.height = 'initial';
    }
    if (postFieldValue.length >= maxLength && e.key !== 'Backspace') {
        e.preventDefault();
    } else {
        currentTarget.style.height = 'auto';
        currentTarget.style.height = currentTarget.scrollHeight + 'px';
    }
  }

  return (
    <div className={styles.postBoxContainer}>
        <div className={styles.postBoxFieldContainer}>
            <Link className={styles.postProfilePicture}>
                <img src={src} alt={alt} />
            </Link>
            <div className={styles.postBoxField}>
                <textarea ref={postFieldRef} onInput={handleTypePost} value={postFieldValue} maxLength={maxCharacters} className="scrollbarPrimary" placeholder={placeholder}></textarea>
            </div>
        </div>
        <div className={styles.postBoxActionContainer}>
            <div className={styles.postBoxActions}>
                <PostInputFile/>
                <PostEmoji/>
            </div>
            <div className={styles.postFieldSection}>
                <p className={styles.counterFieldLength}>{postFieldValue ? postFieldValue.length : 0}/<span>{maxCharacters}</span></p>
                <SmallButton primary={true} text="Submit"/>
            </div>
        </div>
    </div>
  )
}

export default PostBox