import React from 'react'
import PostItem from './PostItem'
import profileDefaultImage from '../../assets/default-avatar.jpg';
import { getPostTimeDiff } from '../../data/posts';

const PostList = ({data,type}) => {
  if(!data || !data.length) {
    return <h1 className="noResults">No results...</h1>
  }

  return (
    <>
      {
        data && data.map((post,index) => <PostItem key={post.id} id={post.id} profileUsername={'@' + post.username} userPostId={post.userId} time={getPostTimeDiff(post.timestamp).length ? getPostTimeDiff(post.timestamp) : null} 
        title={post.name} text={post.post}/>)
      }
    </> 
  )
}

export default PostList