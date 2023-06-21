import React, { useContext } from 'react'
import Modal from '../components/Modal/Modal'
import { ModalContext } from '../context/ModalContext'
import PostShare from '../components/Post/PostShare';

const ActionModal = () => {
  const { modalComponent } = useContext(ModalContext);

  switch (modalComponent) {
    case 'edit-profile':
      return (
        <Modal>
          <EditProfile/>
        </Modal>
      );
    case 'reply':
      return (
        <Modal>
          <PostShare/>
        </Modal>
      );
    default:
      return null;
  }
}

export default ActionModal;
