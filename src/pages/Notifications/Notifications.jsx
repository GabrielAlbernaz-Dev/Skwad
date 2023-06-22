import React, { useContext, useEffect, useState } from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import PostItem from '../../components/Post/PostItem'
import profileDefaultImage from '../../assets/default-avatar.jpg'
import Head from '../../helper/Head'
import { getNotifications, getPostTimeDiff, getPosts } from '../../data/posts'
import Loading from '../../components/Loading/Loading'
import NotificationItem from '../../components/Notifications/NotificationItem'
import { UserContext } from '../../context/UserContext'

const Notifications = () => {
  const { profileInfo } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
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

  if(isLoading) {
    return <div className="flex-row-center w-100">
      <Loading loading={isLoading} />
    </div> 
  }

  return (
    <>
      <Head title="Notifications" description="Profile notifications"/>
      <ContentContainer>
        {notifications.length > 0 ? notifications.map((notification) => {
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
                      src={profileDefaultImage}  
                      name={notification.name} />;
          } else if(notification.type === "comment") {
            return <NotificationItem 
                      type="comment"
                      key={notification.id} 
                      userPostId={notification.userId} 
                      postId={notification.postParent} 
                      src={profileDefaultImage}  
                      name={notification.name} />;
          }
        }) : <h1 className="noResults">No notifications...</h1>}
      </ContentContainer>
    </>
  )
}

export default Notifications