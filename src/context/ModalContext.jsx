import React, { createContext, useState } from 'react'

export const ModalContext = createContext();

export const ModalStorage = ({children}) => {
  const [showModal,setShowModal] = useState(false);
  const [modalContent,setModalContent] = useState('');

  return (
    <>
        <ModalContext.Provider value={{showModal,setShowModal,modalContent,setModalContent}}>
            {children}
        </ModalContext.Provider>
    </>
  )
}
