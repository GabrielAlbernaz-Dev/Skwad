import React from 'react'
import PostItem from './PostItem'
import PostComment from './PostComment'

const PostList = ({data,type}) => {
  return (
    <>
      {type === 'comment' ?
        data && data.map(post => <PostComment key={post.profileId + Math.random()} profileId={post.profileId} src={post.src} time={post.time} title={post.title} text={post.text}/>)
        :
        data && data.map(post => <PostItem key={post.profileId + Math.random()} profileId={post.profileId} src={post.src} time={post.time} title={post.title} text={post.text}/>)
      }
    </>
  )
}

export default PostList