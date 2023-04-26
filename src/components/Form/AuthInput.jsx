import React, { useState } from 'react'
import styles from './Form.module.scss'
import Input from './Input'

const AuthInput = ({icon,placeholder,type}) => {
  const [active,setActive] = useState(false);
  function handleClick({currentTarget}) {
    setActive(true)
  }

  function handleBlur({currentTarget}) {
    setActive(false)
  }

  return (
    <div onBlur={handleBlur} onClick={handleClick} className={`${styles.authGroupControl} ${active ? 'inputAuthActive' : ''}`}>
        <div className={`${styles.authIconControl} ${active ? 'inputAuthActive' : ''}`}>
        {icon}
        </div>
        <Input className={styles.authControl} type={type ? type : 'text'} placeholder={placeholder} />
    </div>
  )
}

export default AuthInput