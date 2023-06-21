import React from 'react'
import styles from './ListExplorer.module.scss'
import { CgList } from 'react-icons/cg';
import { Link } from 'react-router-dom'

const ListExplorer = ({items,label}) => {
  return (
    <ol className={styles.listExplorer}>
        {items && items.map(({id,href,title,counts},i) => 
            <li key={id}>
                <span className={styles.listPosition}>{i +1}</span>
                <Link className={styles.listContent} to={href}>
                    <div>
                      <span className={styles.listContentCategory}>{label}</span>
                      <h2 className={styles.listContentTitle}>{title}</h2>
                    </div>
                    <div className={styles.listContentCounts}>
                      <div className={styles.listContentCountsIcon}>
                        {counts}
                        <CgList/>
                      </div>
                      <p>Posts</p>
                    </div>
                </Link>
            </li>
        )}
    </ol>
  )
}

export default ListExplorer