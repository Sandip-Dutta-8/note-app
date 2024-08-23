import React from 'react'
import { getInitials } from '../utils/helper'

const Profileinfo = ({ onLogout }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex justify-center items-center rounded-full text-slate-950 bg-slate-200 font-medium'>
                {getInitials("Sandip Dutta")}
            </div>

            <div className=''>
                <p className='text-sm font-medium'>
                    Sandip
                </p>
                <button className='text-sm text-slate-700 underline' onClick={onLogout}>
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Profileinfo