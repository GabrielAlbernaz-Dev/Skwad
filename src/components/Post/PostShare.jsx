import React, { useState } from 'react'
import styles from './Post.module.scss'
import {FaWhatsapp} from "react-icons/fa"
import {ImEmbed} from "react-icons/im"
import {AiOutlineLink} from "react-icons/ai"

const PostShare = ({ link }) => {
  const [pasteLink, setPasteLink] = useState('');
  
  function handlePasteClick(e) {
    setPasteLink(link);
    navigator.clipboard.writeText(link);
  }
  
  function handleWhatsappClick() {
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`;
    window.open(whatsappLink);
  }
  
  return (
    <ul className={styles.profileShareList}>
      <li onClick={handlePasteClick}>
        <i className={styles.profileShareIcon}><AiOutlineLink /></i>
        {pasteLink.length > 0 ? 'Copied!' : 'Copy link'}
      </li>
      <li onClick={handleWhatsappClick}>
        <i style={{ background: '#25D366' }} className={styles.profileShareIcon}><FaWhatsapp /></i>
        Share to Whatsapp
      </li>
    </ul>
  );
}

export default PostShare;