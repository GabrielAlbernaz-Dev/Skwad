import React, { useRef, useState, useEffect } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineClose,AiFillCloseCircle } from 'react-icons/ai';
import styles from './Post.module.scss';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PostEmoji = ({ onEmojiClick }) => {
  const [showBox, setShowBox] = useState(false);
  const boxRef = useRef(null);
  const { data: emojiItems, isLoading } = useQuery(['emojis'], getEmojis, {
    staleTime: Infinity,
  });

  async function getEmojis() {
    if (!emojiItems) {
      const response = await axios.get(import.meta.env.VITE_EMOJI_API_URL);
      return response.data;
    }
    return null;
  }

  function handleEmojiClickContainer() {
    setShowBox((prevShowBox) => !prevShowBox)
  }

  function handleEmojiClick(e) {
    const emoji = e.currentTarget.innerText;
    onEmojiClick(emoji);
    setShowBox(false);
  }

  return (
    <>
      <div className={styles.postEmojiContainer} onClick={handleEmojiClickContainer}>
        <i>
          <BsEmojiSmileFill />
        </i>
        {showBox && (
          <div ref={boxRef} className={`${styles.postEmojiBox} scrollbarPrimary`}>
            <div className={styles.postEmojiBoxCloseContainer}>
              <span className={styles.postEmojiBoxClose}><AiOutlineClose/></span>
            </div>
            <ul className={styles.postEmojiList}>
              <Loading loading={isLoading} />
              {Array.isArray(emojiItems) &&
                emojiItems.length > 0 &&
                emojiItems.map((emoji) => (
                  <li
                    onClick={handleEmojiClick}
                    key={emoji.slug}
                    title={emoji.slug}
                    data-emoji-name={emoji.slug}
                  >
                    {emoji.character}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PostEmoji;
