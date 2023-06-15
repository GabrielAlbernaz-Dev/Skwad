import React, { useContext } from 'react'
import PostItem from './PostItem'
import PostComment from './PostComment'
import profileDefaultImage from '../../assets/default-avatar.jpg';
import { UserContext } from '../../context/UserContext';
import { getPostTimeDiff } from '../../data/posts';

const PostList = ({data,type}) => {
  const {profileInfo} = useContext(UserContext);
  
  if(!data || !data.length) {
    return <h1 className="noResults">No results...</h1>
  }

  return (
    <>
      {type === 'comment' ?
        data && data.map(post => <PostComment key={post.profileId + Math.random()} profileUsername={post.profileId} src={post.src} time={post.time} title={post.title} text={post.text}/>)
        :
        data && data.map((post,index) => <PostItem key={post.id} id={post.id} profileUsername={'@' + post.username} 
        src={post.src ? post.src : profileDefaultImage} userPostId={post.userId} time={getPostTimeDiff(post.timestamp).length ? getPostTimeDiff(post.timestamp) : null} 
        title={post.name} text={post.post}/>)
      }
    </> 
  )
}

export default PostList