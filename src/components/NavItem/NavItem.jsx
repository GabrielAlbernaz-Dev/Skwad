import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavItem.module.scss'

const NavItem = ({path,icon,text}) => {
  return (
    <>
        <NavLink className={`${styles.navItemContainer}`} to={path}>
          <div className={styles.content}>
            {icon && icon}
            <p>{text}</p>
          </div>
        </NavLink>
    </>
  )
}

export default NavItem