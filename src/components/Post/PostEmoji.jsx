import { useRef, useState, useEffect } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import styles from './Post.module.scss'
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading/Loading';

const PostEmoji = () => {
  const [showBox, setShowBox] = useState(false);
  const [emojiItens,setEmojiItens] = useState(null);
  const boxRef = useRef(null);
  const {data,loading,error,request} = useFetch();

  async function getEmojis() {
      const {response,json} = await request(import.meta.env.VITE_EMOJI_API_URL);
      setEmojiItens(json);
  }

  function handleEmojiClick() {
    setShowBox(true)
    if(!emojiItens || emojiItens.length < 1) {
      getEmojis();
    }
  }

  function handleClickOutside() {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowBox(false);
      }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles.postEmojiContainer} onClick={handleEmojiClick}>
        <i><BsEmojiSmileFill /></i>
        {showBox && (
        <div ref={boxRef} className={`${styles.postEmojiBox} scrollbarPrimary`}>
          <ul className={styles.postEmojiList}>
            <Loading loading={loading}/>
            {(Array.isArray(emojiItens) && emojiItens.length > 0) && emojiItens.map(emoji => (
                <li onClick={(e)=> console.log(e.currentTarget.innerText) } key={emoji.slug} title={emoji.slug} data-emoji-name={emoji.slug}>
                    {emoji.character}
                </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </>
  )
}

export default PostEmoji