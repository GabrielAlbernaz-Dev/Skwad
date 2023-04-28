import React, { useContext, useEffect, useState } from 'react'
import styles from './Modal.module.scss'
import { ModalContext } from '../../context/ModalContext';
import PostList from '../Post/PostList';

const Modal = ({state,children}) => {
  const {showModal,setShowModal} = useContext(ModalContext);

  function handleCloseModal(e) {
    const {currentTarget} = e;
    if(e.target === currentTarget) {
      setShowModal(false);
    }
  }

  return (
    <>
    {showModal && (<div onClick={handleCloseModal} className={styles.modal}>
        <div className={`${styles.modalContent} scrollbarPrimary`}>
            {children}
        </div>
    </div>)}
    </>
  )
}

export default Modal