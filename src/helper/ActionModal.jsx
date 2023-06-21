import React, { useContext } from 'react'
import Modal from '../components/Modal/Modal'
import { ModalContext } from '../context/ModalContext'
import PostShare from '../components/Post/PostShare'; 
import EditProfile from '../layouts/Profile/EditProfile'

const ActionModal = () => {
  const { modalComponent,modalPostLink } = useContext(ModalContext);

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
          <PostShare link={modalPostLink}/>
        </Modal>
      );
    default:
      return null;
  }
}

export default ActionModal;
