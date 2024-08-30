import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"

const Searchbar = ({ value, handelSearch, onChange, onClearSearch }) => {
    return (
        <div className='w-70 lg:w-80 flex items-center px-4 lg:px-6 bg-slate-100 rounded-3xl'>
            <input
                type='text'
                value={value}
                placeholder='Search Notes'
                className='w-full text-sm bg-transparent py-[11px] outline-none'
                onChange={onChange}
            />

            {value && <IoMdClose onClick={onClearSearch} className='text-slate-500 text-3xl hover:text-slate-950 cursor-pointer mr-2' />}

            <FaMagnifyingGlass onClick={handelSearch} className='text-slate-500 hover:text-slate-950 cursor-pointer text-xl' />
        </div>
    )
}

export default Searchbar