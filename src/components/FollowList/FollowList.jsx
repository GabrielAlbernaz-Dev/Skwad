import React from 'react'
import styles from './FollowList.module.scss'
import { Link } from 'react-router-dom'

const FollowList = ({text,accounts}) => {
  return (
    <section className={styles.followListContainer}>
        <h1 className={styles.followListTitle}>{text}</h1>
        <ul>
            {accounts && accounts.map((account,i) => {
                return (
                    <li className={styles.followListItem} key={i}>
                        <Link to={account.path} className={styles.followListAvatar}>
                            <img src={account.avatar.src} alt={account.avatar.alt} />
                        </Link>
                        <Link to={account.path} className={styles.followListText}>
                            <h5 className={styles.followListTextProfile}>{account.profile.name}</h5>
                            <p className={styles.followListTextBio}>{account.profile.bio}</p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </section>
  )
}

export default FollowList