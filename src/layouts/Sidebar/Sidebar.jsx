import React, { useContext, useEffect, useState } from 'react';
import NavItem from '../../components/NavItem/NavItem';
import styles from './Sidebar.module.scss';
import { FaHashtag, FaUser } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import FollowList from '../../components/FollowList/FollowList';
import profileUser from '../../assets/default-avatar.jpg';
import { UserContext } from '../../context/UserContext';
import { getProfileInfoByUserId } from '../../data/profile';
import Loading from '../../components/Loading/Loading';
import { getFollowingProfiles, getPopularProfiles } from '../../data/follow';

const Sidebar = () => {
  const { profileInfo } = useContext(UserContext);
  const [profileUserInfo, setProfileUserInfo] = useState(null);
  const [popularProfiles, setPopularProfiles] = useState(null);
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileUser() {
      try {
        if (profileInfo) {
          const profileInfoData = await getProfileInfoByUserId(profileInfo.userId);
          setProfileUserInfo(profileInfoData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    async function fetchFollowingProfiles() {
      try {
        if (profileInfo) {
          const profiles = await getFollowingProfiles(profileInfo.userId);
          setFollowingProfiles(profiles);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    async function fetchPopularProfiles() {
      try {
        if (profileInfo) {
          const popularProfilesData = await getPopularProfiles(5);
          setPopularProfiles(popularProfilesData);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchProfileUser();
    fetchFollowingProfiles();
    fetchPopularProfiles();
  },[profileInfo]);

  if (isLoading) {
    return (
      <div className={styles.mainSidebarContainer}>
        <aside className={`${styles.mainSidebar} scrollbarPrimary`}>
          <Loading loading={true} />
        </aside>
      </div>
    );
  }

  return (
    <div className={styles.mainSidebarContainer}>
      <aside className={`${styles.mainSidebar} scrollbarPrimary`}>
        <nav>
          <NavItem path="/" icon={<AiFillHome />} text="For You" />
          <NavItem path="/explore" icon={<FaHashtag />} text="Explore" />
          <NavItem path="/notifications" icon={<IoMdNotifications />} text="Notifications" />
          <NavItem path={`/profile/${profileUserInfo ? profileUserInfo.id : ''}`} icon={<FaUser />} text="Profile" />
        </nav>
        <FollowList text="Popular" accounts={popularProfiles} />
        <FollowList text="Following" accounts={followingProfiles} />
      </aside>
    </div>
  );
};

export default Sidebar;
