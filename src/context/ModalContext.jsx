import React, { createContext, useState } from 'react'
import PostList from '../components/Post/PostList';

export const ModalContext = createContext();

export const ModalStorage = ({children}) => {

  const [showModal,setShowModal] = useState(false);
  const [modalComponent,setModalComponent] = useState(null);
  const [modalPostLink,setModalPostLink] = useState(null);

  const modalSettings = {
    handleModal: function({currentTarget}) {
      setModalComponent(null);
      setShowModal(!showModal);
      setModalComponent(currentTarget.dataset.modalComponent)
      setModalPostLink(currentTarget.dataset.modalPostLink)
    },

    closeModal: function({currentTarget}) {
      setModalComponent(null);
      setShowModal(false);
    },

    closeModalAfterSubmit() {
      setModalComponent(null);
      setShowModal(false);
    }
  }


  return (
    <>
        <ModalContext.Provider 
        value={{showModal,setShowModal,modalComponent,setModalComponent,modalPostLink,setModalPostLink,modalSettings}}>
            {children}
        </ModalContext.Provider>
    </>
  )
}
