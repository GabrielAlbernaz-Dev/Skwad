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

const Sidebar = () => {
  const { profileInfo } = useContext(UserContext);
  const [profileUserInfo, setProfileUserInfo] = useState(null);
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
    fetchProfileUser();
  },[profileInfo]);

  const accountsFactory = [
    {
      path:"/",
      profile: {
        name:'brTT',
        bio:'@brttGames'
      },
      avatar: {
        src:profileUser,
        alt:'Brtt Profile'
      }
    },
    {
      path:"/",
      profile: {
        name:'FURIA Mwzera',
        bio:'@mwzera'
      },
      avatar: {
        src:profileUser,
        alt:'MW Profile'
      }
    },
    {
      path:"/",
      profile: {
        name:'brTT',
        bio:'@brttGames'
      },
      avatar: {
        src:profileUser,
        alt:'Brtt Profile'
      }
    },
    {
      path:"/",
      profile: {
        name:'brTT',
        bio:'@brttGames'
      },
      avatar: {
        src:profileUser,
        alt:'Brtt Profile'
      }
    },
    {
      path:"/",
      profile: {
        name:'brTT',
        bio:'@brttGames'
      },
      avatar: {
        src:profileUser,
        alt:'Brtt Profile'
      }
    }
  ];

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
        <FollowList text="Popular" accounts={accountsFactory} />
        <FollowList text="Following" accounts={accountsFactory} />
      </aside>
    </div>
  );
};

export default Sidebar;
