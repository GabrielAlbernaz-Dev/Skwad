import React, { useContext, useEffect, useState } from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import PostItem from '../../components/Post/PostItem'
import profileDefaultImage from '../../assets/default-avatar.jpg'
import Head from '../../helper/Head'
import { getNotifications, getPostTimeDiff, getPosts } from '../../data/posts'
import Loading from '../../components/Loading/Loading'
import NotificationItem from '../../components/Notifications/NotificationItem'
import { UserContext } from '../../context/UserContext'
import { getProfilePhotoById } from '../../helper/file'
import { getProfileInfoByUserId } from '../../data/profile'

const Notifications = () => {
  const { profileInfo } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(profileInfo) {
      setIsLoading(true);
      async function fetchNotifications() {
        const { notifyLikes, posts, comments } = await getNotifications(profileInfo.userId,profileInfo.username);
        const combinedNotifications = [...notifyLikes, ...posts,...comments];
        combinedNotifications.sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(combinedNotifications);
        setIsLoading(false);
      }
  
      fetchNotifications();
    }
  }, [profileInfo]);

  useEffect(()=>{
    async function fetchProfilePhotos() {
      const images = {};
      if(notifications) {
          for (const notification of notifications) {
              const {id} = await getProfileInfoByUserId(notification?.userId);
              try {
                  const downloadUrl = await getProfilePhotoById(id)
                  images[notification.id] = downloadUrl;
              } catch (error) {
                  console.error(`Error fetching profile image for notification ${id}:`, error);
                  images[notification.id] = null;
              }
          }
          setProfileImages(images);
      }
    }
    fetchProfilePhotos();
  },[notifications])

  if(isLoading) {
    return <div className="flex-row-center w-100">
      <Loading loading={isLoading} />
    </div> 
  }

  return (
    <>
      <Head title="Notifications" description="Profile notifications"/>
      <ContentContainer>
        {notifications.length > 0 ? notifications.map((notification,i) => {
          if (notification.type === "post") {
            return <PostItem 
                      key={notification.id} 
                      id={notification.id}
                      time={notification.timestamp.length ? getPostTimeDiff(notification.timestamp) : null}
                      userPostId={notification.userId}
                      title={notification.name}
                      text={notification.post}
                      profileUsername={'@' + notification.username} />;
          } else if (notification.type === "like") {
            return <NotificationItem 
                      type="like"
                      key={notification.id} 
                      userPostId={notification.userId} 
                      postId={notification.postId} 
                      src={profileImages[notification.id] || profileDefaultImage}  
                      name={notification.name} />;
          } else if(notification.type === "comment") {
            return <NotificationItem 
                      type="comment"
                      key={notification.id} 
                      userPostId={notification.userId} 
                      postId={notification.postParent} 
                      src={profileImages[notification.id] || profileDefaultImage}  
                      name={notification.name} />;
          }
        }) : <h1 className="noResults">No notifications...</h1>}
      </ContentContainer>
    </>
  )
}

export default Notifications