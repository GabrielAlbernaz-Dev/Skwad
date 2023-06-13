import React from 'react'
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss'

const SearchBar = ({children,placeholder,...props}) => {
    return (
        <>
            <div className={styles.searchBar}>
                <input type="text" {...props} placeholder={placeholder} className={styles.searchInput} />
                <button className={styles.searchButton}>
                    <FaSearch />
                </button>
            {children}
            </div>
        </>
    );
}

export default SearchBar