import React from 'react'
import styles from './Form.module.scss'

const Textarea = ({...props}) => {
  return (
    <textarea className={`${styles.controlDefault} scrollbarPrimary`} {...props}></textarea>
  )
}

export default Textarea