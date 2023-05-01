import React from 'react'
import styles from './Modal.module.scss'
import {CgClose} from 'react-icons/cg'

const CloseButtonModal = ({handleClose}) => {
  return (
    <div className={styles.modalClose} onClick={handleClose}>
        <CgClose/>
    </div>
  )
}

export default CloseButtonModal