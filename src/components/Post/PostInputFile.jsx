import React from 'react'
import styles from './Post.module.scss'
import { FaImage } from 'react-icons/fa'

const PostInputFile = () => {
  return (
    <>
        <label className={styles.postFileLabel} htmlFor="file-input">
            <FaImage />
        </label>
        <input
            id="file-input"
            type="file"
            className={styles.postFileInput}
        // onChange={handleFileUpload}
        />
    </>
  )
}

export default PostInputFile