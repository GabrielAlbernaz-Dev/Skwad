import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';

const EmojiPost = ({ onSelectEmoji }) => {
  const [showPicker, setShowPicker] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  function handleEmojiSelect(emoji) {
    onSelectEmoji(emoji.native);
    setShowPicker(false);
  };

  function togglePicker() {
    setShowPicker((prevShowPicker) => !prevShowPicker);
  };

  return (
    <div className="emojiPostContainer">
      <BsEmojiSmileFill onClick={togglePicker} />
      <div className="emojiPostBox">
        {showPicker && (
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            emojiSize={isMobile ? 15 : 22}
          />
        )}
      </div>
    </div>
  );
};

export default EmojiPost;
