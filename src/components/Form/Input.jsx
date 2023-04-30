import React from 'react'
import styles from './Form.module.scss'

const Input = ({type,...props}) => {
  return (
    <input className={styles.controlDefault} type={type ? type : 'text'} {...props} />
  )
}

export default Input