import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import EmojiPost from '../Emoji/EmojiPost';
import SmallButton from '../Button/SmallButton';
import styles from './Comment.module.scss';

const CommentBox = ({ src, alt, placeholder, refetchData }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const maxCharacters = 200;
  const commentFieldRef = useRef(null);
  const commentFieldValue = watch('comment', '');

  function handleTypeComment(e) {
    const { currentTarget } = e;
    const maxLength = parseInt(currentTarget.maxLength);
    if (commentFieldValue.trim('') === '' || commentFieldValue.length === 0) {
      currentTarget.style.height = 'initial';
    }
    if (commentFieldValue.length >= maxLength && e.key !== 'Backspace') {
      e.preventDefault();
    } else {
      currentTarget.style.height = 'auto';
      currentTarget.style.height = currentTarget.scrollHeight + 'px';
    }
  }

  function handleSelectEmoji(emoji) {
    setValue('comment', commentFieldValue + emoji);
  }

  return (
    <form>
      <div className={styles.commentBoxContainer}>
        <div className={styles.commentBoxFieldContainer}>
          <Link className={styles.commentProfilePicture}>
            <img src={src} alt={alt} />
          </Link>
          <div className={styles.commentBoxField}>
            <textarea
              ref={commentFieldRef}
              {...register('comment')}
              onInput={handleTypeComment}
              value={commentFieldValue}
              maxLength={maxCharacters}
              className="scrollbarPrimary"
              placeholder={placeholder}
            ></textarea>
          </div>
        </div>
        <div className={styles.commentBoxActionContainer}>
          <div className={styles.commentBoxActions}>
            <EmojiPost onSelectEmoji={handleSelectEmoji} />
          </div>
          <div className={styles.commentFieldSection}>
            <p className={styles.counterFieldLength}>
              {commentFieldValue ? commentFieldValue.length : 0}/<span>{maxCharacters}</span>
            </p>
            <SmallButton type="submit" primary={true} text="Comment" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
