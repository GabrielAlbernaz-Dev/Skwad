import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostBox from '../../components/Post/PostBox'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import { getPost } from '../../data/posts';
import PostItem from '../../components/Post/PostItem';
import profileDefaultImage from '../../assets/default-avatar.jpg'

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
  
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
          {post ? (
            <>
             <PostBox placeholder={post.title} />
            </>
          ) : <p>Loading post...</p>}
        </ContentContainer>
      </>
    );
};

export default Post