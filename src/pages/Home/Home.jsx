import React, { useContext} from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import PostBox from '../../components/Post/PostBox'
import PostList from '../../components/Post/PostList'
import Head from '../../helper/Head'
import profileUser from '../../assets/default-avatar.jpg'
import { getPosts } from '../../data/posts'
import { UserContext } from '../../context/UserContext'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/Loading/Loading'

const Home = () => {
  const { profileInfo } = useContext(UserContext);
  const { data: posts, isLoading,refetch} = useQuery(['posts'], getPosts);

  return (
    <>
      <Head title="Home" description="Homepage"/>
      <ContentContainer>
          <PostBox refetchData={refetch} src={profileUser} maxLength={300} placeholder={`What's on your mind, ${profileInfo?.name}?`}/>
          {isLoading ? 
          <div className="flex-row-center"><Loading loading={isLoading} /></div> 
          : 
          <PostList data={posts} type="posts"/>}
      </ContentContainer>
    </>
  )
}

export default Home