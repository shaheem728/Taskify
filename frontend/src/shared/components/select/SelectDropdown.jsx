import React, { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
const SelectDropdown = ({ options,value,onChange,placeholder})=>{
    const [isOpen,setIsOpen] = useState(false)

    const handleSelect = (option)=>{
        onChange(option)
        setIsOpen(false)
    }
  return (
    <div className='relative w-full'>
        {/*Dropdown Button */}
        <button onClick={()=>setIsOpen(!isOpen)}
            className='w-full text-xs text-black outline-none bg-white border border-slate-100 px-2.5 py-3 mt-2 rounded-md flex justify-between items-center'>{value?options.find((opt)=>opt.value === value)?.label:placeholder}
            <span className='ml-2'>{isOpen?<LuChevronDown className='rotate-180' /> : <LuChevronDown className='' /> }</span>
        </button>

        {/* Dropdown Menu */}
        {
            isOpen && (
                <div className='absolute w-full bg-white border-slate-100 border rounded-md shadow-md z-10'>
                    {
                        options.map((option)=>(
                            <div 
                            key={option.value}
                            onClick={()=>handleSelect(option.value)}
                            className='px-3 py-2 text-xs cursor-pointer hover:bg-gray-100'>
                                {option.label}
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default SelectDropdown
