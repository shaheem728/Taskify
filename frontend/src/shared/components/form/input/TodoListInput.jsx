
import React, { useState } from 'react'
import { Plus, Edit, Check, X, Trash2, User } from 'lucide-react'

const TodoListInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState("")
    const [editingIndex, setEditingIndex] = useState(null)
    const [editingText, setEditingText] = useState("")

    // Add option
    const handleAddOption = () => {
        if (option.trim()) {
            setTodoList([...todoList, {
                text: option.trim(),
                status: "Pending",
                updateBy: null
            }])
            setOption("")
        }
    }

    // Delete option
    const handleDeleteOption = (index) => {
        const updatedArr = todoList.filter((_, idx) => idx !== index)
        setTodoList(updatedArr)

        if (editingIndex === index) setEditingIndex(null)
        else if (editingIndex > index) setEditingIndex(editingIndex - 1)
    }

    // Start editing
    const handleStartEdit = (index, item) => {
        setEditingIndex(index)
        setEditingText(item.text || item)
    }

    // Save editing
    const handleSaveEdit = (index) => {
        const text = editingText.trim()
        if (!text) return

        setTodoList(todoList.map((item, idx) =>
            idx === index
                ? (typeof item === "string" ? text : { ...item, text })
                : item
        ))

        setEditingIndex(null)
        setEditingText("")
    }

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingIndex(null)
        setEditingText("")
    }

    const styles = {
        "In Progress": "text-cyan-700 bg-cyan-100 border-cyan-100",
        Completed: "text-green-700 bg-green-100 border-green-100",
        Pending: "text-violet-700 bg-violet-100 border-violet-100",
    }

    return (
        <div>
            {todoList.map((item, index) => (
                <div
                    key={index}
                    className={`flex justify-between lg:flex-row flex-col space-y-1 px-3 py-2 rounded-md mb-3 mt-2 ${
                        styles[item.status] || styles.Pending
                    }`}
                >
                    {editingIndex === index ? (
                        <input
                            autoFocus
                            type="text"
                            value={editingText}
                            onChange={({ target }) => setEditingText(target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") handleSaveEdit(index)
                                if (event.key === "Escape") handleCancelEdit()
                            }}
                            aria-label={`Edit checklist item ${index + 1}`}
                            className="form-input min-w-0 flex-1"
                        />
                    ) : (
                        <p className="text-md text-black">
                            <span className="text-xs text-gray-400 font-semibold mr-2">
                                {index < 9 ? `0${index + 1}` : index + 1}
                            </span>
                            {item.text || item}
                        </p>
                    )}

                    <div className="flex lg:flex-row flex-col lg:items-center items-end justify-end lg:gap-3 gap-1">
                        {/* Updated By */}
                        {item.updateBy && (
                            <div className="flex items-center gap-2 ">
                                <div className="flex">
                                    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                                        <User size={15} />
                                        {item.updateBy?.name}
                                    </span>
                                </div>

                                <span
                                    className={`px-2 py-1 rounded-full text-xs lg:font-medium capitalize ${
                                        item.updateBy?.role === "admin"
                                            ? "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                                            : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                    }`}
                                >
                                    {item.updateBy?.role}
                                </span>
                            </div>
                        )}

                        {/* Status */}
                        <span className={`text-sm lg:ml-3 ${styles[item.status] || styles.Pending}`}>
                            {item.status}
                        </span>

                        {/* Edit / Save / Cancel */}
                        <div className='flex  gap-2'>
                        {editingIndex === index ? (
                            <>
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={() => handleSaveEdit(index)}
                                    aria-label="Save checklist item"
                                >
                                    <Check size={18} className="text-green-600" />
                                </button>

                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={handleCancelEdit}
                                    aria-label="Cancel editing checklist item"
                                >
                                    <X size={18} className="text-gray-500" />
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => handleStartEdit(index, item)}
                                aria-label="Edit checklist item"
                            >
                                <Edit size={17} className="text-blue-500" />
                            </button>
                        )}

                        {/* Delete */}
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => handleDeleteOption(index)}
                            aria-label="Delete checklist item"
                        >
                            <Trash2 size={18} className="text-red-500" />
                        </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Task */}
            <div className="flex items-center gap-5 mt-4">
                <input
                    type="text"
                    placeholder="Enter Task"
                    value={option}
                    onChange={({ target }) => setOption(target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") handleAddOption()
                    }}
                    className="form-input"
                />

                <button
                    type="button"
                    className="card-btn text-nowrap"
                    onClick={handleAddOption}
                >
                    <Plus size={18} />
                    Add
                </button>
            </div>
        </div>
    )
}

export default TodoListInput
