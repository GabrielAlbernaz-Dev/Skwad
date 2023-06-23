import React from 'react'
import styles from './Modal.module.scss'
import CloseButtonModal from './CloseButtonModal'

const ModalImagePreview = ({show,setShowModal,src}) => {

  function handleCloseModal(e) {
    const {currentTarget} = e;
    if(e.target === currentTarget) {
        setShowModal(false);
    }
  }
    
  return (
    <>
        {show && (<div onClick={handleCloseModal} className={styles.modal}>
            <div className={`${styles.modalContent} scrollbarPrimary`}>
                <CloseButtonModal className={styles.modalCloseImg} handleClose={() => setShowModal(false)}/>
                <img className={styles.modalPreviewImg} src={src}/>
            </div>
        </div>)}
    </>
  )
}

export default ModalImagePreview