import React from 'react'
import styles from './ActionIcon.module.scss'

const ActionIcon = ({icon,onClick}) => {
  return (
    <div onClick={onClick} className={styles.actionIconContainer}>
        {icon && icon}
    </div>
  )
}

export default ActionIcon