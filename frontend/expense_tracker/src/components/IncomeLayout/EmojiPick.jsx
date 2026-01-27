
import { CgImage } from "react-icons/cg";
import EmojiPicker from 'emoji-picker-react';
import { IoClose } from "react-icons/io5";
const EmojiPicked = ({ setEmoji, setemojiPickerShow,emojiPickerShow, setisEmojiOpen}) => {
    
    const onEmojiClick = (emojiData) => {
        setEmoji(emojiData?.imageUrl || "")
        setisEmojiOpen(true)
        setemojiPickerShow(false)
    }
    return (
        <div className=''>
            <span className='flex items-center gap-3 text-sm font-medium'>
                <span onClick={() => setemojiPickerShow(true)}>
                    <CgImage className='cursor-pointer text-4xl bg-[#F3E8FF] text-[#9810FA] p-2 rounded-md' />
                </span>
                Pick Icon
            </span>
            {
                emojiPickerShow &&
                <div className='flex items-start'>
                    <EmojiPicker className='mt-4' onEmojiClick={onEmojiClick} />
                    <IoClose onClick={() => setemojiPickerShow(false)} className='text-gray-500 text-xl cursor-pointer' />
                </div>

            }

        </div>
    )
}

export default EmojiPicked