import React, { useContext} from 'react'
import styles from './Post.module.scss'
import { Link } from 'react-router-dom'
import { FaHeart,FaComment,FaShare } from 'react-icons/fa';
import { ModalContext } from '../../context/ModalContext';
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { firebaseDb } from '../../config/firebase';
import { collection,doc,getDocs,query, where, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { UserContext } from '../../context/UserContext';

const PostItem = ({ id, title, text, src, time, profileId }) => {
  const { profileInfo } = useContext(UserContext);
  const { modalSettings } = useContext(ModalContext);

  const queryLikedPost = async (postId) => {
    const likesQuery = query(
      collection(firebaseDb, 'likes'),
      where('postId', '==', postId),
      where('userId', '==', profileInfo.userId)
    );
    const likesSnapshot = await getDocs(likesQuery);
    return likesSnapshot.size > 0;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (id) => {
      const likesQuery = query(
        collection(firebaseDb, 'likes'),
        where('postId', '==', id),
        where('userId', '==', profileInfo.userId)
      );
      const likesSnapshot = await getDocs(likesQuery);

      if (likesSnapshot.size > 0) {
        likesSnapshot.forEach(async (likeDoc) => {
          await deleteDoc(doc(firebaseDb, 'likes', likeDoc.id));
        });
      } else {
        await addDoc(collection(firebaseDb, 'likes'), {
          postId: id,
          userId: profileInfo.userId,
        });
      }
    },
    {
      onSuccess: (result) => {
        console.log(result);
        // Atualiza a query do like para refletir a mudança imediatamente
        queryClient.invalidateQueries(['likes', id]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { data: liked } = useQuery(['likes', id], () => queryLikedPost(id));

  const handleLikePost = () => {
    mutation.mutate(id);
  };

  if (!(title && profileId) ?? !src) {
    return null;
  }

  return (
    <article className={styles.postItemContainer}>
      <Link className={styles.postProfilePicture}>
        <img src={src} alt={src ? src.slice(0, 4) : ''} />
      </Link>
      <div className={styles.postContent}>
        <Link className={styles.postProfileLink}>
          <h2 className={styles.postProfileLinkTitle}>{title}</h2>
          <p className={styles.postProfileLinkId}>
            {profileId}
            {time && (
              <>
                <span className={styles.postProfileLinkIdSeparator}></span>
                <span>{time}</span>
              </>
            )}
          </p>
        </Link>
        <p className={styles.postProfileDescription}>{text && text}</p>
      </div>
      <div className={styles.postActionOptions}>
        <i className={liked ? 'primary' : ''} onClick={handleLikePost}>
          <FaHeart />
        </i>
        <i onClick={modalSettings.handleModal} data-modal-component="comment">
          <FaComment />
        </i>
        <i onClick={modalSettings.handleModal} data-modal-component="reply">
          <FaShare />
        </i>
      </div>
    </article>
  );
};

export default PostItem;