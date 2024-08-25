import React from 'react'
import Taginput from './Taginput'

const AddeditNote = () => {
    return (
        <div>
            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    type='text'
                    placeholder='Go to Gym'
                    className='text-slate-950 text-2xl outline-1 outline-slate-400 p-2'
                />
            </div>

            <div className='flex flex-col gap-2 mt-3'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    className='text-sm text-slate-950 outline-1 outline-slate-400 bg-slate-50 p-2 rounded'
                    type='text'
                    placeholder='content'
                    rows={10}
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <Taginput />
            </div>
            <button className='btn-primary font-medium mt-5 p-3' onClick={()=>{}}>
                ADD
            </button>
        </div>
    )
}

export default AddeditNote