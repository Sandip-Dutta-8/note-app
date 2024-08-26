import React, { useState } from 'react'
import Taginput from './Taginput'
import { MdClose } from 'react-icons/md';

const AddeditNote = ({ setOpenModal, noteData, type }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);

    const onClose = () => {
        setOpenModal({ isShown: false, type: 'add', data: null })
    }

    //ADD NOTE
    const addNewNote = async () => {}

    //EDIT NOTE
    const editNote = async () => {}

    const handelAddNote = () => {
        if(!title){
            setError("Please enter the title")
            return;
        }
        if(!content){
            setError("Please enter the content");
            return;
        }
        setError("");

        if(type === "edit"){
            editNote();
        }else{
            addNewNote();
        }
    }

    return (
        <div className='relative'>
            
            <button className='w-10 h-10 flex items-center justify-center absolute -top-3 -right-4 hover:bg-slate-100 rounded-full' onClick={onClose}>
                <MdClose className='text-xl text-slate-400'/>
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    type='text'
                    placeholder='Go to Gym'
                    className='text-slate-950 text-2xl outline-1 outline-slate-400 p-2'
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
            </div>

            <div className='flex flex-col gap-2 mt-3'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    className='text-sm text-slate-950 outline-1 outline-slate-400 bg-slate-50 p-2 rounded'
                    type='text'
                    placeholder='content'
                    rows={10}
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <Taginput 
                    tags={tags}
                    setTags={setTags}
                />
            </div>
            {error && <p className='text-red-500 text-sm pt-4'>{error}</p>}
            <button className='btn-primary font-medium mt-4 p-3' onClick={handelAddNote}>
                ADD
            </button>
        </div>
    )
}

export default AddeditNote