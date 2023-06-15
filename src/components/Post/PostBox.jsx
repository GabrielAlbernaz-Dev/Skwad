import React, { useContext, useEffect, useRef} from 'react'
import styles from './Post.module.scss'
import { Link } from 'react-router-dom'
import SmallButton from '../Button/SmallButton'
import PostInputFile from './PostInputFile';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UserContext } from '../../context/UserContext';
import { firebaseDb } from '../../config/firebase';
import { collection,addDoc, serverTimestamp } from 'firebase/firestore';
import EmojiPost from '../Emoji/EmojiPost';


const PostBox = ({src,alt,placeholder,refetchData}) => {  
  const{register,handleSubmit,setValue, watch,reset} = useForm();
  const {profileInfo} = useContext(UserContext);
  const maxCharacters = 300;
  const postFieldRef = useRef(null);
  const postFieldValue = watch('post', '');

  const mutation = useMutation({
      mutationFn: async (formData) => {
        const updatedFormData = {
          ...formData,
          userId: profileInfo.userId,
          username:profileInfo.username,
          name:profileInfo.name,
          timestamp: serverTimestamp(),
        };

        return await addDoc(collection(firebaseDb, 'posts'), updatedFormData);
      },
      onSuccess: (result) => {
        refetchData();
        reset();
      },
      onError: (error) => {
          console.log(error)
          console.log(mutation.error)
          reset();
      }
  });

  function onSubmit(data) {
      mutation.mutate(data)
  };

  useEffect(() => {
    if (postFieldValue.length === 0) {
      if (postFieldRef.current) postFieldRef.current.style.height = 'initial';
    }
  }, [postFieldValue]);

  function handleTypePost(e) {
    const { currentTarget } = e;
    const maxLength = parseInt(currentTarget.maxLength);
    if (postFieldValue.trim('') === '' || postFieldValue.length === 0) {
      currentTarget.style.height = 'initial';
    }
    if (postFieldValue.length >= maxLength && e.key !== 'Backspace') {
      e.preventDefault();
    } else {
      currentTarget.style.height = 'auto';
      currentTarget.style.height = currentTarget.scrollHeight + 'px';
    }
  }

  function handleSelectEmoji(emoji) {
    setValue('post', postFieldValue + emoji);
  }

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.postBoxContainer}>
            <div className={styles.postBoxFieldContainer}>
                <Link className={styles.postProfilePicture}>
                    <img src={src} alt={alt} />
                </Link>
                <div className={styles.postBoxField}>
                    <textarea ref={postFieldRef} {...register('post')} onInput={handleTypePost} value={postFieldValue} maxLength={maxCharacters} className="scrollbarPrimary" placeholder={placeholder}></textarea>
                </div>
            </div>
            <div className={styles.postBoxActionContainer}>
                <div className={styles.postBoxActions}>
                    <PostInputFile/>
                    <EmojiPost onSelectEmoji={handleSelectEmoji}/>
                </div>
                <div className={styles.postFieldSection}>
                    <p className={styles.counterFieldLength}>{postFieldValue ? postFieldValue.length : 0}/<span>{maxCharacters}</span></p>
                    <SmallButton type="submit" primary={true} text="Post"/>
                </div>
            </div>
        </div>
    </form>
  )
}

export default PostBox