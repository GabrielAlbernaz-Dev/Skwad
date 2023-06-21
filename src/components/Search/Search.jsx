import React, { useState } from 'react';
import { collection, getDocs, query} from 'firebase/firestore';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import styles from './Search.module.scss';
import { firebaseDb } from '../../config/firebase';
import { useQuery } from '@tanstack/react-query';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: profilesSearch } = useQuery(['profilesSearch'], async () => {
    const profileQuery = query(collection(firebaseDb, 'profileInfo'));
    const profileSnapshot = await getDocs(profileQuery);
    return profileSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  
  const { data: postsSearch } = useQuery(['postsSearch'], async () => {
    const postQuery = query(collection(firebaseDb, 'posts'));
    const postSnapshot = await getDocs(postQuery);
    return postSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });

  const profilesFilter = profilesSearch?.filter((profile) => profile.name.includes(searchQuery));
  const postsFilter = postsSearch?.filter((post) => post.post.includes(searchQuery));

  function handleSearch(e) {
    const { currentTarget } = e;
    setSearchQuery(currentTarget.value);
  }

  return (
    <section className={styles.searchItem}>
      <SearchBar onKeyUp={handleSearch} placeholder="Search Posts and Accounts">
        {searchQuery.length > 0 && <SearchList setQueryValue={setSearchQuery} profiles={profilesFilter} posts={postsFilter} />}
      </SearchBar>
    </section>
  );
};

export default Search;
