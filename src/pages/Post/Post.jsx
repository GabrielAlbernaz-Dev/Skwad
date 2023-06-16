import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostBox from '../../components/Post/PostBox'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import { getComments, getPost, getPostTimeDiff } from '../../data/posts';
import PostItem from '../../components/Post/PostItem';
import profileDefaultImage from '../../assets/default-avatar.jpg'
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import PostList from '../../components/Post/PostList';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { data: comments, isLoading,refetch} = useQuery(['comments', id], () => getComments(id));

    useEffect(() => {
      const fetchPost = async () => {
        const post = await getPost(id);
        setPost(post);
      };
  
      fetchPost();
    }, [id]);
  
    return (
      <>
        <ContentContainer>
          {post && (
            <>
                <PostItem 
                    id={post.id} 
                    isParent={true}
                    profileUsername={'@' + post.username} 
                    src={profileDefaultImage} 
                    userPostId={post?.userId} 
                    time={getPostTimeDiff(post?.timestamp).length ? getPostTimeDiff(post?.timestamp) : null} 
                    title={post.name} text={post.post}
                    />
                <PostBox style={{marginTop:15}} parentId={id} refetchData={refetch} placeholder={'Type your commment'} maxLength={200} comment={true} src={profileDefaultImage} />
                <h2 className="commentsTitle">Comments</h2>
                {isLoading ? <Loading loading={isLoading}/> : <PostList data={comments} type="comment"/>}
            </>
          )}
        </ContentContainer>
      </>
    );
};

export default Post