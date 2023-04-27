import React from 'react'
import PostItem from './PostItem'

const PostList = ({data}) => {
  return (
    <>
      {data && data.map(post => <PostItem key={post.profileId + Math.random()} profileId={post.profileId} src={post.src} time={post.time} title={post.title} text={post.text}/>)}
    </>
  )
}

export default PostList