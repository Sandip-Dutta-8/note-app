import React from 'react'
import NoteIMG from '../assets/Note.png'

const EmptyCard = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={NoteIMG} alt="No Notes" className='w-60'/>

        <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
            Start creating your first NOTE! Click the '+' icon to jot down your thoughts, ideas and reminders. Let's get started! 
        </p>
    </div>
  )
}

export default EmptyCard