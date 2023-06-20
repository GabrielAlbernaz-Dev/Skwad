import React from 'react'
import styles from './ListExplorer.module.scss'
import { GoMention } from 'react-icons/go';
import { Link } from 'react-router-dom'

const ListExplorer = ({items,label}) => {
  return (
    <ol className={styles.listExplorer}>
        {items && items.map(({id,href,title,views},i) => 
            <li key={id}>
                <span className={styles.listPosition}>{i +1}</span>
                <Link className={styles.listContent} href={href}>
                    <div>
                      <span className={styles.listContentCategory}>{label}</span>
                      <h2 className={styles.listContentTitle}>{title}</h2>
                    </div>
                    <p className={styles.listContentViews}>
                      <GoMention/>
                      {views}
                    </p>
                </Link>
            </li>
        )}
    </ol>
  )
}

export default ListExplorer