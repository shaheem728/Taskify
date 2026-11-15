import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";
const AttachmentsInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    //Function to handle adding an option
    const handleAddOption = () => {
        if (option.trim())
            setAttachments([...attachments, option.trim()]);
        setOption("")
    }

    //Function to handle deleting an option
    const handleDeleteOption = (index) => {
        const updateArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updateArr);
    }
    return (
        <div>
            {
                attachments.map((item, index) => (
                    <div
                        key={item}
                        className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 '
                    >
                        <div className='flex flex-1 items-center gap-3 min-w-0'>
                            <LuPaperclip className='text-gray-400' />
                            <p className='text-xs text-black break-all'>{item}</p>
                        </div>
                        <button
                            className='cursor-pointer'
                            onClick={() => {
                                handleDeleteOption(index);
                            }}>
                            <HiOutlineTrash className='text-lg text-red-500' />
                        </button>
                    </div>
                ))}

            <div className='flex items-center gap-5 mt-4'>
                <input
                    type="text"
                    placeholder='Add File Link'
                    value={option}
                    onChange={({ target }) => setOption(target.value)}
                    className='form-input' />

                <button className='card-btn text-nowrap' onClick={handleAddOption}>
                    <LuPaperclip className="text-sm" />Add
                </button>
            </div>
        </div>
    )
}

export default AttachmentsInput
