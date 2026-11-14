import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2"
import { User } from 'lucide-react';
const TodoListInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState("")
    //Function to handle adding an option
    const handleAddOption = () => {
        if (option.trim()) {
            setTodoList([...todoList, { text: option.trim(), status: "Pending", updateBy: null }])
            setOption("");
        }
    }
    //Function to handle deleting an option
    const handleDeleteOption = (index) => {
        const updatedArr = todoList.filter((_, idx) => idx !== index)
        setTodoList(updatedArr)
    }
    const styles = {
        "In Progress": "text-cyan-700 bg-cyan-100 border-cyan-100",
        Completed: "text-green-700 bg-green-100 border-green-100",
        Pending: "text-violet-700 bg-violet-100 border-violet-100",
    };
    return (
        <div>
            {
                todoList.map((item, index) => (
                    <div
                        key={item}
                        className={`flex justify-between px-3 py-2 rounded-md mb-3 mt-2 ${styles[item.status] || styles.Pending
                            } `}>
                        <p className='text-md text-black '>
                            <span className='text-xs text-gray-400 font-semibold mr-2'>
                                {index < 9 ? `0${index + 1}` : index + 1}
                            </span> {item.text || item}
                        </p>
                        <div className="flex items-center gap-3">
                            {/* Updated By */}
                            {
                                item.updateBy && (
                                    <div className="flex items-center gap-2 ml-4">
                                        <div className="flex">
                                            <span className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                                                <User size={15} />   {item.updateBy?.name}
                                            </span>
                                        </div>

                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${item.updateBy?.role === "admin"
                                                ? "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                                                : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                }`}
                                        >
                                            {item.updateBy?.role}
                                        </span>
                                    </div>
                                )
                            }


                            {/* Status */}
                            <span className={`text-sm ml-3 ${styles[item.status] || styles.Pending}`}>
                                {item.status}
                            </span>

                            {/* Delete */}
                            <button
                                className="cursor-pointer"
                                onClick={() => handleDeleteOption(index)}
                            >
                                <HiOutlineTrash className="text-lg text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}

            <div className='flex items-center gap-5 mt-4'>
                <input type='text'
                    placeholder='Enter Task'
                    value={option}
                    onChange={({ target }) => setOption(target.value)}
                    className='w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md'
                />
                <button className='card-btn text-nowrap' onClick={handleAddOption}>
                    <HiMiniPlus className='text-lg' />Add
                </button>
            </div>
        </div>
    )
}

export default TodoListInput
