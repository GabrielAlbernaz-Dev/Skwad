import React from 'react'
import NavItem from '../../components/NavItem/NavItem'
import styles from './Sidebar.module.scss'
import { FaHashtag,FaUser  } from "react-icons/fa";
import {IoMdNotifications} from "react-icons/io"
import {AiFillHome} from "react-icons/ai"
import FollowList from '../../components/FollowList/FollowList';
import profileUser from  '../../assets/default-avatar.jpg'

const Sidebar = () => {
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
  return (
    <div className={styles.mainSidebarContainer}>
      <aside className={`${styles.mainSidebar} scrollbarPrimary`}>
          <nav>
            <NavItem path="/" icon={<AiFillHome />} text="For You"/>
            <NavItem path="/explore" icon={<FaHashtag />} text="Explore"/>
            <NavItem path="/notifications" icon={<IoMdNotifications />} text="Notifications"/>
            <NavItem path="/profile" icon={<FaUser />} text="Profile"/>
          </nav>
          <FollowList text="Popular" accounts={accountsFactory}/>
          <FollowList text="Following" accounts={accountsFactory}/>
      </aside>
    </div>
  )
}

export default Sidebar