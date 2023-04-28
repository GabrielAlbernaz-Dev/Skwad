import React, { createContext, useState } from 'react'
import PostList from '../components/Post/PostList';

export const ModalContext = createContext();

export const ModalStorage = ({children}) => {

  const [showModal,setShowModal] = useState(false);
  const [modalComponent,setModalComponent] = useState(null);

  const modalSettings = {
    handleModal: function({currentTarget}) {
      setModalComponent(null);
      setShowModal(!showModal);
      setModalComponent(currentTarget.dataset.modalComponent)
    }
  }


  return (
    <>
        <ModalContext.Provider 
        value={{showModal,setShowModal,modalComponent,setModalComponent,modalSettings}}>
            {children}
        </ModalContext.Provider>
    </>
  )
}
