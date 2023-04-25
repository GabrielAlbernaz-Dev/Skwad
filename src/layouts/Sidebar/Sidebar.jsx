import React from 'react'
import NavItem from '../../components/NavItem/NavItem'
import styles from './Sidebar.module.scss'
import { FaHashtag,FaUser  } from "react-icons/fa";
import {IoMdNotifications} from "react-icons/io"
import {AiFillHome} from "react-icons/ai"
import FollowList from '../../components/FollowList/FollowList';

const Sidebar = () => {
  const accountsFactory = [
    {
      path:"/",
      profile: {
        name:'brTT',
        bio:'@brttGames'
      },
      avatar: {
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICisTU28AJm6sUpTMTp75hUWXnAqV5U3aKqePfp6miQ&s',
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
        src:'data:image/jpeg;base64,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',
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
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICisTU28AJm6sUpTMTp75hUWXnAqV5U3aKqePfp6miQ&s',
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
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICisTU28AJm6sUpTMTp75hUWXnAqV5U3aKqePfp6miQ&s',
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
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICisTU28AJm6sUpTMTp75hUWXnAqV5U3aKqePfp6miQ&s',
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