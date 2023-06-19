import React, { useContext } from 'react'
import PostItem from './PostItem'
import profileDefaultImage from '../../assets/default-avatar.jpg';
import { UserContext } from '../../context/UserContext';
import { getPostTimeDiff } from '../../data/posts';

const PostList = ({data,type}) => {
  if(!data || !data.length) {
    return <h1 className="noResults">No results...</h1>
  }

  return (
    <>
      {
        data && data.map((post,index) => <PostItem key={post.id} id={post.id} profileUsername={'@' + post.username} 
        src={post.src ? post.src : profileDefaultImage} userPostId={post.userId} time={getPostTimeDiff(post.timestamp).length ? getPostTimeDiff(post.timestamp) : null} 
        title={post.name} text={post.post}/>)
      }
    </> 
  )
}

export default PostList