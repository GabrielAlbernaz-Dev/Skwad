import React, { useContext } from 'react'
import Modal from '../components/Modal/Modal'
import { ModalContext } from '../context/ModalContext'
import PostList from '../components/Post/PostList'
import {postsDataTest} from '../data/PostsMock'

const PostActionModal = () => {
  const { modalComponent } = useContext(ModalContext);

  switch (modalComponent) {
    case 'comment':
      return (
        <Modal>
          <PostList type="comment" data={postsDataTest} />
        </Modal>
      );
    case 'reply':
      return (
        <Modal>
          <h2 style={{color:'white'}}>Reply</h2>
        </Modal>
      );
    default:
      return null;
  }
}

export default PostActionModal;
