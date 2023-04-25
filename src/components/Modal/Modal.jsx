import React from 'react'
import styles from './Modal.module.scss'

const Modal = ({state,children}) => {
  return (
    <>
    {state && (<div className={styles.modal}>
        <div className={styles.modalContent}>
            {children}
        </div>
    </div>)}
    </>
  )
}

export default Modal