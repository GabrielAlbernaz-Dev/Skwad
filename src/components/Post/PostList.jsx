import React, { useContext } from 'react'
import PostItem from './PostItem'
import PostComment from './PostComment'
import profileDefaultImage from '../../assets/default-avatar.jpg';
import moment from 'moment/moment';
import { UserContext } from '../../context/UserContext';

const PostList = ({data,type}) => {
  const {profileInfo} = useContext(UserContext);

  function getTimeDiff(timestamp) {
    const milliseconds = moment(timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6));
    const date = moment(milliseconds);
    const currentDate = moment();
    const diff = currentDate.diff(date);
    const diffDuration = moment.duration(diff);
    const years = diffDuration.years();
    const months = diffDuration.months();
    const days = diffDuration.days();
    const hours = diffDuration.hours();
    const minutes = diffDuration.minutes();
  
    if (years >= 1) {
      return years + 'y';
    } else if (months >= 1) {
      return months + 'mo';
    } else if (days >= 1) {
      return days + 'd';
    } else if (hours >= 1) {
      return hours + 'h';
    } else {
      return minutes + 'm';
    }
  }

  return (
    <>
      {type === 'comment' ?
        data && data.map(post => <PostComment key={post.profileId + Math.random()} profileId={post.profileId} src={post.src} time={post.time} title={post.title} text={post.text}/>)
        :
        data && data.map((post,index) => <PostItem key={post.id} id={post.id} profileId={'@' + post.username} 
        src={post.src ? post.src : profileDefaultImage} time={getTimeDiff(post.timestamp).length ? getTimeDiff(post.timestamp) : null} 
        title={post.name} text={post.post}/>)
      }
    </>
  )
}

export default PostList