import React from 'react'
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss'

const SearchBar = ({placeholder}) => {

return (
    <div className={styles.searchBar}>
        <input type="text" placeholder={placeholder} className={styles.searchInput} />
        <button className={styles.searchButton}>
            <FaSearch />
        </button>
    </div>
    );
}

export default SearchBar