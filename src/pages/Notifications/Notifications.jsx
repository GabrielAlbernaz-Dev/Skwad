import React from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import PostItem from '../../components/Post/PostItem'
import PostList from '../../components/Post/PostList'
import Head from '../../helper/Head'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../data/posts'
import Loading from '../../components/Loading/Loading'

const Notifications = () => {
  const { data: posts, isLoading } = useQuery(['posts'], getPosts);
  return (
    <>
      <Head title="Notifications" description="Profile notifications"/>
      <ContentContainer>
        {isLoading ? 
        <div className="flex-row-center">
          <Loading loading={isLoading} />
        </div> 
        : 
        <PostList data={posts}/>}
      </ContentContainer>
    </>
  )
}

export default Notifications