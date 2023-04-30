import React, { useContext } from 'react'
import Modal from '../components/Modal/Modal'
import { ModalContext } from '../context/ModalContext'
import PostList from '../components/Post/PostList'
import {postsDataTest} from '../data/PostsMock'
import Input from '../components/Form/Input'
import EditProfile from '../layouts/Profile/EditProfile'
import PostShare from '../components/Post/PostShare'

const ActionModal = () => {
  const { modalComponent } = useContext(ModalContext);

  switch (modalComponent) {
    case 'edit-profile':
      return (
        <Modal>
          <EditProfile/>
        </Modal>
      );
    case 'comment':
      return (
        <Modal>
          <PostList type="comment" data={postsDataTest} />
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
