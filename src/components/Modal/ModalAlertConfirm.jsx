import React from 'react'
import styles from './Modal.module.scss'
import CloseButtonModal from './CloseButtonModal'
import SmallButton from '../Button/SmallButton';

const ModalAlertConfirm = ({showModal,setShowModal,message,confirmCb}) => {
    function handleCloseModal(e) {
        const {currentTarget} = e;
        if(e.target === currentTarget) {
            setShowModal(false);
        }
    }

    function handleClickClose() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (<div onClick={handleCloseModal} className={styles.modal}>
                <div className={`${styles.modalContent} scrollbarPrimary`}>
                    <CloseButtonModal handleClose={handleClickClose}/>
                    <p className={styles.modalConfirmMessage}>{message}</p>
                    <div className={styles.modalConfirmBtnsComtainer}>
                        <SmallButton type="button" primary={true} onClick={() => confirmCb()} text={'Ok'}/>
                        <SmallButton type="button" style={{background:'#000'}} onClick={handleClickClose} text={'Cancel'}/>
                    </div>
                </div>
            </div>)}
        </>
      )
}

export default ModalAlertConfirm