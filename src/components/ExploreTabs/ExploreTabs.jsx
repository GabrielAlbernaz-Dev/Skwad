import React from 'react'
import styles from './ExploreTabs.module.scss'

const ExploreTabs = ({active,setActive}) => {

  function handleActiveTab({currentTarget}) {
    setActive(currentTarget.dataset.tab);
  }

  return (
    <>
      <ul className={styles.exploreTabsContainer}>
        <li className={`${styles.tabItem} ${active == 'trending' ? 'tabItemActive' : ''}`} data-tab="trending" onClick={handleActiveTab}>Trending</li>
        <li className={`${styles.tabItem} ${active == 'recommendations' ? 'tabItemActive' : ''}`} data-tab="recommendations" onClick={handleActiveTab}>Recommendations</li>
        <li className={`${styles.tabItem} ${active == 'news' ? 'tabItemActive' : ''}`} data-tab="news" onClick={handleActiveTab}>News</li>
      </ul>
    </> 
  )
}

export default ExploreTabs