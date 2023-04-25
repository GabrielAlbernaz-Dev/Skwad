import React from 'react'
import styles from './Main.module.scss'

const Main = ({children}) => {
  return (
    <main className={styles.mainContent}>
        {children}
    </main>
  )
}

export default Main