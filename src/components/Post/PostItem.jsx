import React, { useContext, useEffect, useState} from 'react'
import styles from './Post.module.scss'
import { Link } from 'react-router-dom'
import { FaHeart,FaComment,FaShare } from 'react-icons/fa';
import { ModalContext } from '../../context/ModalContext';
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { firebaseDb } from '../../config/firebase';
import { collection,doc,getDocs,query, where, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { UserContext } from '../../context/UserContext';

const PostItem = ({ id, title, text, src, time, profileUsername,userPostId,isParent }) => {
  const { profileInfo } = useContext(UserContext);
  const { modalSettings } = useContext(ModalContext);
  const [profileId,setProfileId] = useState(null);

  useEffect(() => {
    async function fetchProfileId() {
      if (profileInfo) {
        const profileQuery = query(collection(firebaseDb, "profileInfo"), where("userId", "==", userPostId));
        const profileDocs = await getDocs(profileQuery);
        if (!profileDocs.empty) {
          const profileDoc = profileDocs.docs[0];
          setProfileId(profileDoc.id)
        }
      }
    }
    fetchProfileId();
  }, [id]);

  const queryLikedPost = async (postId) => {
    const likesQuery = query(
      collection(firebaseDb, 'likes'),
      where('postId', '==', postId),
      where('userId', '==', profileInfo?.userId)
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
        where('userId', '==', profileInfo?.userId)
      );
      const likesSnapshot = await getDocs(likesQuery);

      if (likesSnapshot.size > 0) {
        likesSnapshot.forEach(async (likeDoc) => {
          await deleteDoc(doc(firebaseDb, 'likes', likeDoc.id));
        });
      } else {
        await addDoc(collection(firebaseDb, 'likes'), {
          postId: id,
          userPostId:userPostId,
          userId: profileInfo.userId,
        });
      }
    },
    {
      onSuccess: (result) => {
        console.log(result);
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

  if (!(title && profileUsername) ?? !src) {
    return null;
  }

  return (
    <article className={styles.postItemContainer}>
      <Link to={`/profile/${profileId}`} className={styles.postProfilePicture}>
        <img src={src} alt={src ? src.slice(0, 4) : ''} />
      </Link>
      <div className={styles.postContent}>
        <Link to={`/profile/${profileId}`} className={styles.postProfileLink}>
          <h2 className={styles.postProfileLinkTitle}>{title}</h2>
          <p className={styles.postProfileLinkId}>
            {profileUsername}
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
        {isParent ? '' : (<Link className={styles.postCommentIcon} to={`/posts/${id}`}>
          <i>
            <FaComment />
          </i>
        </Link>)}
        <i onClick={modalSettings.handleModal} data-modal-component="reply">
          <FaShare />
        </i>
      </div>
    </article>
  );
};

export default PostItem;