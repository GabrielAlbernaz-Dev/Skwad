import React from 'react'
import styles from './Loading.module.scss'

const Loading = ({loading}) => {
  if(!loading) return null;
  return (
    <div className={styles.loading}></div>
  )
}

export default Loading