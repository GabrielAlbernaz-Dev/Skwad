import React from 'react';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';

const SearchList = ({ profiles, posts,setQueryValue}) => {
  const isSearchEmpty = !profiles.length && !posts.length;

  if(isSearchEmpty) {
    return (
        <ul className={styles.searchList}>
            <p className={styles.searchListNoResults}>No Results!</p>
        </ul>
    )
  }

  function closeList() {
    setQueryValue('');
  }

  return (
    <ul className={`${styles.searchList} scrollbarPrimary`}>
      {profiles?.map((profile) => (
        <li key={profile.id} className={styles.searchListItem}>
          <Link onClick={closeList} to={`/profile/${profile.id}`}>
            <p className={styles.searchListItemText}>{profile.name}</p>
            <span className={styles.searchListItemType}>Profile</span>
          </Link>
        </li>
      ))}
      {posts?.map((post) => (
        <li key={post.id} className={styles.searchListItem}>
          <Link onClick={closeList} to={`/posts/${post.id}`}>
            <p className={styles.searchListItemText}>{post.post}</p>
            <span className={styles.searchListItemType}>Post</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
