import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment'

const Notecard = ({ title, date, content, tags, isPinned, onDelete, onPinNote, onEdit }) => {
    return (
        <div className='border rounded-md p-4 bg-white drop-shadow-sm hover:drop-shadow-md transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-md font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{date}</span>
                </div>

                <div className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200'>
                    <MdOutlinePushPin className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"} `} onClick={onPinNote} />
                </div>
            </div>

            <p className='text-sm text-slate-500 mt-2'>{content?.slice(0, 60)}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-sm text-slate-500'>{tags.map((tag) => `#${tag}`)}</div>

                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-green-600 ' onClick={onEdit} />
                    <MdDelete className='icon-btn hover:text-red-600 ' onClick={onDelete} />
                </div>
            </div>
        </div>
    )
}

export default Notecard