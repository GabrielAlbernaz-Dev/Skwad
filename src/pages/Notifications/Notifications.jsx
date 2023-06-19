import React, { useContext, useEffect, useState } from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import PostItem from '../../components/Post/PostItem'
import profileDefaultImage from '../../assets/default-avatar.jpg'
import Head from '../../helper/Head'
import { useQuery } from '@tanstack/react-query'
import { getNotifications, getPostTimeDiff, getPosts } from '../../data/posts'
import Loading from '../../components/Loading/Loading'
import NotificationItem from '../../components/Notifications/NotificationItem'
import { UserContext } from '../../context/UserContext'

const Notifications = () => {
  const { data: posts, isLoading } = useQuery(['posts'], getPosts);
  const { profileInfo } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if(profileInfo) {
      async function fetchNotifications() {
        const { notifyLikes, posts, comments } = await getNotifications(profileInfo.userId,profileInfo.username);
        const combinedNotifications = [...notifyLikes, ...posts,...comments];
        combinedNotifications.sort((a, b) => b.timestamp - a.timestamp);
  
        setNotifications(combinedNotifications);
      }
  
      fetchNotifications();
    }
  }, [profileInfo]);

  return (
    <>
      <Head title="Notifications" description="Profile notifications"/>
      <ContentContainer>
        { isLoading ? <div className="flex-row-center">
          <Loading loading={isLoading} />
        </div> : (
          notifications.map((notification) => {
            if (notification.type === "post") {
              return <PostItem 
                        key={notification.id} 
                        id={notification.id}
                        src={profileDefaultImage}
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
            return <h1 className="noResults">No results...</h1>
          })
        )}
      </ContentContainer>
    </>
  )
}

export default Notifications