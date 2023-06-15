import React from 'react'
import styles from './FollowList.module.scss'
import profileDefaultImage  from '../../assets/default-avatar.jpg';
import { Link } from 'react-router-dom'

const FollowList = ({text,accounts}) => {
  return (
    <section className={styles.followListContainer}>
        <h1 className={styles.followListTitle}>{text}</h1>
        <ul>
            {accounts && accounts.map((account,i) => {
                return (
                    <li className={styles.followListItem} key={i}>
                        <Link to={`/profile/${account.id}`} className={styles.followListAvatar}>
                            <img src={profileDefaultImage} alt={''} />
                        </Link>
                        <Link to={`/profile/${account.id}`} className={styles.followListText}>
                            <h5 className={styles.followListTextProfile}>{account.name}</h5>
                            <p className={styles.followListTextBio}>{'@' + account.username}</p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </section>
  )
}

export default FollowList