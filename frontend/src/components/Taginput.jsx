import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const Taginput = ({ tags, setTags }) => {

  const [inputValue, setInputvalue] = useState("");

  const handelChange = (e) => {
    setInputvalue(e.target.value);
  }

  const addNewTags = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputvalue("");
    }
  }

  const handelKeydown = (e) => {
    if (e.key === "Enter") {
      addNewTags();
    }
  }

  const handelRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div>

      {tags?.length > 0 && (
        <div className='flex items-center flex-wrap mt-2 gap-2'>
          {tags.map((tag, index) => (
            <span key={index} className='bg-slate-100 py-1 px-3 flex items-center gap-2 text-sm text-slate-900 rounded'>
              #{tag}
              <button onClick={() => handelRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className='flex items-center gap-4 mt-3'>
        <input
          type="text"
          className='text-sm bg-transparent border px-2 py-3 rounded outline-1 outline-slate-100'
          placeholder='Add tags'
          onChange={handelChange}
          onKeyDown={handelKeydown}
          value={inputValue}
        />

        <button className='w-8 h-8 flex items-center justify-center border-blue-700 border hover:bg-blue-700 rounded-full'
          onClick={addNewTags}
        >
          <MdAdd className='text-2xl text-blue-700 hover:text-white' />
        </button>

      </div>
    </div>
  )
}

export default Taginput
