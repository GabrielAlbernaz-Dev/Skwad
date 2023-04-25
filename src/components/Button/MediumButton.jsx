import React from 'react'
import styles from './Button.module.scss'

const MediumButton = ({text,primary,icon,fontSize,...props}) => {
  return (
    <button className={primary ? styles.mediumButtonPrimary : styles.mediumButton} {...props}>
        {icon && icon}
        {text ? text : ''}
    </button>
  )
}

export default MediumButton