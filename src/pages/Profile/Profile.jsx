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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firebaseDb } from '../../config/firebase';
import Loading from '../../components/Loading/Loading';
import { getProfileInfoById } from '../../data/profile';
import { countFollowersById, countFollowsById, followProfileById,isFollowingProfile, unfollowProfileById } from '../../data/follow';

const Profile = () => {
  const [activeTabs, setActiveTabs] = useState('posts');
  const { profileInfo } = useContext(UserContext);
  const { id } = useParams();
  const [postsProfile, setPostsProfile] = useState([]);
  const [followingProfile, setFollowingProfile] = useState(false);
  const [postProfileLiked, setPostProfileLiked] = useState([]);
  const [currentFollowersCount, setCurrentFollowersCount] = useState(0);
  const [currentFollowsCount, setCurrentFollowsCount] = useState(0);
  const [currentProfileLikes, setCurrentProfileLikes] = useState(0);
  const [currentProfileInfo, setCurrentProfileInfo] = useState(null);
  const [profileLogged,setProfileLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchProfileData() {
      try {
        const profileInfoData = await getProfileInfoById(id);
        setCurrentProfileInfo(profileInfoData);

        const profileIsFollowing = await isFollowingProfile(profileInfoData?.userId, profileInfo.userId);
        setFollowingProfile(profileIsFollowing);

        const followersCountResponse = await countFollowersById(profileInfo.userId);
        setCurrentFollowersCount(followersCountResponse);

        const followsCountResponse = await countFollowsById(profileInfo.userId);
        setCurrentFollowsCount(followsCountResponse);

        const likesSnapshot = await getDocs(query(collection(firebaseDb, 'likes'), where('userPostId', '==', profileInfoData?.userId)));
        const likesData = likesSnapshot.size;
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

  const mutationFollows = useMutation({
    mutationFn: async () => {
      if (followingProfile) {
        return await unfollowProfileById(currentProfileInfo?.userId, profileInfo?.userId);
      } else {
        return await followProfileById(id, currentProfileInfo?.userId, profileInfo?.userId);
      }
    },
    onSuccess: (result) => {
      setFollowingProfile(prevFollowingProfile => !prevFollowingProfile);
    },
    onError: (error) => {
      console.error(error);
      console.error(mutationFollows.error);
    },
  });
  
  function handleFollow() {
    mutationFollows.mutate();
  }

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
          following={currentFollowsCount}
          followers={currentFollowersCount}
          likes={currentProfileLikes}
          description={'Lorem ipsum'}
          profileLogged={profileLogged}
          handleFollow={handleFollow}
          isFollowing={followingProfile}
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
