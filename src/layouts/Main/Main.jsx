import React, { useContext } from 'react'
import styles from './Main.module.scss'
import { UserContext } from '../../context/UserContext'

const Main = ({children}) => {
  const {auth} = useContext(UserContext);
  return (
    <main className={auth ? styles.mainContent : styles.mainDefault }>
        {children}
    </main>
  )
}

export default Main