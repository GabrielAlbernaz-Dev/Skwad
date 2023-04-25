import React from 'react'
import styles from './ListExplorer.module.scss'
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const ListExplorer = ({items}) => {
  return (
    <ol className={styles.listExplorer}>
        {items && items.map(({id,href,title,views},i) => 
            <li key={id}>
                <span className={styles.listPosition}>{i +1}</span>
                <Link className={styles.listContent} href={href}>
                    <div>
                      <span className={styles.listContentCategory}>Trending</span>
                      <h2 className={styles.listContentTitle}>{title}</h2>
                    </div>
                    <p className={styles.listContentViews}>
                      <FaRegEye/>
                      {views}
                    </p>
                </Link>
            </li>
        )}
    </ol>
  )
}

export default ListExplorer