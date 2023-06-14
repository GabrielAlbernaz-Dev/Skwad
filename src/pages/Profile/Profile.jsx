import React, { useContext, useEffect } from 'react';
import ProfileHeader from '../../layouts/ProfileHeader/ProfileHeader';
import ContentContainer from '../../layouts/ContentContainer/ContentContainer';
import PostItem from '../../components/Post/PostItem';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';
import { useState } from 'react';
import PostList from '../../components/Post/PostList';
import Head from '../../helper/Head';
import profilePhoto from '../../assets/profile-photo.jpeg';
import { getLikedPostsByUser, getPostByUserId, getPosts } from '../../data/posts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firebaseDb } from '../../config/firebase';
import Loading from '../../components/Loading/Loading';
import { getProfileInfoById } from '../../data/profile';
const Profile = () => {
  const [activeTabs, setActiveTabs] = useState('posts');
  const { profileInfo } = useContext(UserContext);
  const { id } = useParams();
  const [postsProfile, setPostsProfile] = useState([]);
  const [postProfileLiked, setPostProfileLiked] = useState([]);
  const [currentProfileInfo, setCurrentProfileInfo] = useState(null);
  const [currentProfileLikes, setCurrentProfileLikes] = useState(null);
  const [profileLogged,setProfileLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchProfileData() {
      try {
        const profileInfoData = await getProfileInfoById(id);
        setCurrentProfileInfo(profileInfoData);

        const likesSnapshot = await getDocs(collection(firebaseDb, 'likes'));
        const likesData = likesSnapshot.docs.filter((doc) => doc.data().userPostId === profileInfoData?.userId).length;
        setCurrentProfileLikes(likesData);

        const postProfileData = await getPostByUserId(profileInfoData?.userId);
        setPostsProfile(postProfileData);

        const postsLikedData = await getLikedPostsByUser(profileInfoData?.userId); 
        setPostProfileLiked(postsLikedData);

        setProfileLogged(profileInfo.userId === profileInfoData.userId);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    fetchProfileData();
  }, [id,activeTabs]);

  const data = {
    posts: postsProfile,
    likes: postProfileLiked,
    comments: [],
  };

  return (
    <>
      <Head title="Profile" description="Profile page" />
      <ContentContainer>
        <ProfileHeader
          id={id}
          name={id ? currentProfileInfo?.name : profileInfo?.name}
          username={id ? currentProfileInfo?.username : profileInfo?.username}
          following={'10,000'}
          followers={id ? '1' : '100'}
          likes={currentProfileLikes ? currentProfileLikes : '0'}
          description={id ? 'ID desc' : 'Lorem ipsum'}
          profileLogged={profileLogged}
        />
        <ProfileTabs active={activeTabs} setActive={setActiveTabs} />
        {isLoading ? (
        <div className="flex-row-center w-100">
          <Loading loading={true} />
        </div>
        ) : <PostList data={data[activeTabs]} />}
      </ContentContainer>
    </>
  );
};

export default Profile;
