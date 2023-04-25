import React from 'react'
import styles from './Button.module.scss'

const SmallButton = ({text,primary,icon,fontSize,...props}) => {
  return (
    <button className={primary ? styles.smallButtonPrimary : styles.smallButton} {...props}>
        {icon && icon}
        {text ? text : ''}
    </button>
  )
}

export default SmallButton