import React, { useContext, useEffect, useState} from 'react'
import styles from './Post.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart,FaComment,FaShare,FaTrash } from 'react-icons/fa';
import { ModalContext } from '../../context/ModalContext';
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { firebaseDb } from '../../config/firebase';
import { collection,doc,getDocs,query, where, addDoc, deleteDoc,serverTimestamp } from 'firebase/firestore';
import profileDefaultImage from '../../assets/default-avatar.jpg';
import { UserContext } from '../../context/UserContext';
import { deletePost, getCommentsCount, getLikesCount } from '../../data/posts';
import { getPostPhotoById, getProfilePhotoById } from '../../helper/file';
import ModalAlert from '../Modal/ModalAlertConfirm';
import ModalAlertConfirm from '../Modal/ModalAlertConfirm';

const PostItem = ({ id, title, text, src, time, profileUsername,userPostId,isParent}) => {
  const { profileInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { modalSettings } = useContext(ModalContext);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [profileId,setProfileId] = useState(null);
  const [profileImage,setProfileImage] = useState(null);
  const [postImage,setPostImage] = useState(null);
  const [alertModal,setAlertModal] = useState(false);

  useEffect(() => {
    async function fetchProfileIdAndPhoto() {
      if (profileInfo) {
        const profileQuery = query(collection(firebaseDb, "profileInfo"), where("userId", "==", userPostId));
        const profileDocs = await getDocs(profileQuery);
        if (!profileDocs.empty) {
          const profileDoc = profileDocs.docs[0];
          setProfileId(profileDoc.id);
          const profilePhotoUrl = await getProfilePhotoById(profileDoc.id);
          setProfileImage(profilePhotoUrl);
        }
      }
    }
    async function fetchProfilePost() {
      const postPhotoUrl = await getPostPhotoById(id);
      setPostImage(postPhotoUrl);
    }
    async function fetchCounts() {
      const likesCount = await getLikesCount(id);
      setLikesCount(likesCount);

      const commentsCount = await getCommentsCount(id);
      setCommentsCount(commentsCount);
    }
    fetchProfileIdAndPhoto();
    fetchProfilePost();
    fetchCounts();
  }, [id]);

  async function queryLikedPost(postId) {
    const likesQuery = query(
      collection(firebaseDb, 'likes'),
      where('postId', '==', postId),
      where('userId', '==', profileInfo?.userId)
    );
    const likesSnapshot = await getDocs(likesQuery);
    return likesSnapshot.size > 0;
  }

  const queryClient = useQueryClient();

  const mutationLikes = useMutation(
    async (id) => {
      const likesQuery = query(
        collection(firebaseDb, "likes"),
        where("postId", "==", id),
        where("userId", "==", profileInfo?.userId)
      );
      const likesSnapshot = await getDocs(likesQuery);
  
      if (likesSnapshot.size > 0) {
        likesSnapshot.forEach(async (likeDoc) => {
          await deleteDoc(doc(firebaseDb, "likes", likeDoc.id));

          const notifyLikesQuery = query(
            collection(firebaseDb, "notifyLikes"),
            where("postId", "==", id),
            where("userId", "==", profileInfo?.userId)
          );

          const notifyLikesSnapshot = await getDocs(notifyLikesQuery);
          if (notifyLikesSnapshot.size > 0) {
            notifyLikesSnapshot.forEach(async (notifyDoc) => {
              await deleteDoc(doc(firebaseDb, "notifyLikes", notifyDoc.id));
            });
          }

        });
      } else {
        await addDoc(collection(firebaseDb, "likes"), {
          postId: id,
          userPostId: userPostId,
          userId: profileInfo.userId,
        });

        await addDoc(collection(firebaseDb, "notifyLikes"), {
          postId: id,
          userPostId: userPostId,
          userId: profileInfo.userId,
          name: profileInfo.name,
          timestamp: serverTimestamp(),
        });
      }
    },
    {
      onSuccess: async (result) => {
        console.log(result);
        queryClient.invalidateQueries(['likes', id]);
        const likesCount = await getLikesCount(id);
        setLikesCount(likesCount);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { data: liked } = useQuery(['likes', id], () => queryLikedPost(id));

  async function handleLikePost() {
    mutationLikes.mutate(id);
  }

  function handleDeleteModal() {
    setAlertModal(true);
  }

  async function handleDeletePost() {
      await deletePost(id);
      setAlertModal(false);
      navigate(0);
  }

  function formatPostNumber(number) {
    if (number >= 1000 && number < 1000000) {
      return `${(number / 1000).toFixed(1)}k`;
    } else if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else {
      return number.toString();
    }
  }

  if (!(title && profileUsername) ?? !src) {
    return null;
  }

  return (
    <article className={styles.postItemContainer}>
      <Link to={`/profile/${profileId}`} className={styles.postProfilePicture}>
        <img src={profileImage ? profileImage : profileDefaultImage} alt={profileImage ? profileImage.slice(0, 4) : profileDefaultImage.slice(0, 4)} />
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
        <p className={styles.postProfileDescription}>
          {postImage && <div><img className={styles.postProfileImage} src={postImage}/></div>}
          {text && text}
        </p>
      </div>
      <div className={styles.postActionOptions}>
        <i className={liked ? 'primary' : ''} onClick={handleLikePost}>
          <FaHeart />
          {likesCount ? <span>{formatPostNumber(likesCount)}</span> : ''}
        </i>
        {isParent ? '' : (<Link className={styles.postCommentIcon} to={`/posts/${id}`}>
          <i>
            <FaComment />
            {commentsCount ? <span>{formatPostNumber(commentsCount)}</span> : ''}
          </i>
        </Link>)}
        <i onClick={modalSettings.handleModal} data-modal-post-link={`${window.location.origin}/posts/${id}`} data-modal-component="reply">
          <FaShare />
        </i>
        {profileInfo?.id === profileId && (
          <>
            <ModalAlertConfirm showModal={alertModal} setShowModal={setAlertModal} message="Do you really want to delete your post?" confirmCb={handleDeletePost}/>
            <i onClick={handleDeleteModal}><FaTrash /></i>
          </>
        )}
      </div>
    </article>
  );
};

export default PostItem;