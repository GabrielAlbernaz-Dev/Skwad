import React from 'react';
import { useLocation } from 'react-router-dom';
import PostBox from '../../components/Post/PostBox'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import { getComments, getPost, getPostTimeDiff, getPostsByHashtag } from '../../data/posts';
import PostItem from '../../components/Post/PostItem';
import profileDefaultImage from '../../assets/default-avatar.jpg'
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import PostList from '../../components/Post/PostList';

const Posts = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    const { data: hashtagPosts, isLoading,refetch} = useQuery(['hashtagPosts', queryParam], () => getPostsByHashtag(queryParam));

    return (
      <>
        <ContentContainer>
            <h1 style={{color:'#fff'}}>Teste</h1>
            {isLoading ? <Loading loading={isLoading}/> : <PostList data={hashtagPosts} type="posts"/>}
        </ContentContainer>
      </>
    );
}

export default Posts