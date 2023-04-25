import React from 'react'
import styles from './ProfileTabs.module.scss'

const ProfileTabs = ({active,setActive}) => {

  function handleActiveTab({currentTarget}) {
    setActive(currentTarget.dataset.tab);
  }

  return (
    <>
      <ul className={styles.tabsContainer}>
        <li className={`${styles.tabItem} ${active == 'posts' ? 'tabItemActive' : ''}`} data-tab="posts" onClick={handleActiveTab}>Posts</li>
        <li className={`${styles.tabItem} ${active == 'likes' ? 'tabItemActive' : ''}`} data-tab="likes" onClick={handleActiveTab}>Likes</li>
        <li className={`${styles.tabItem} ${active == 'comments' ? 'tabItemActive' : ''}`} data-tab="comments" onClick={handleActiveTab}>Comments</li>
      </ul>

    </> 
  )
}

export default ProfileTabs