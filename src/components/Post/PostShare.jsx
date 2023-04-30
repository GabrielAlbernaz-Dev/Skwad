import React from 'react'
import styles from './Post.module.scss'
import {FaWhatsapp} from "react-icons/fa"
import {ImEmbed} from "react-icons/im"
import {AiOutlineLink} from "react-icons/ai"

const PostShare = () => {
  return (
    <ul className={styles.profileShareList}>
        <li>
            <i className={styles.profileShareIcon}><AiOutlineLink/></i>
            Copy link
        </li>
        <li>
            <i className={styles.profileShareIcon}><ImEmbed/></i>
            Embed Link
        </li>
        <li>
            <i style={{background:'#25D366'}} className={styles.profileShareIcon}><FaWhatsapp/></i>
            Share to Whatsapp
        </li>
    </ul>
  )
}

export default PostShare