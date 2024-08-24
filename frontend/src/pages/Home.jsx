import React from 'react'
import Navbar from "../components/Navbar"
import Notecard from '../components/Notecard'
import { MdAdd } from 'react-icons/md'

const Home = () => {
  return (
    <>
      <Navbar />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-10 mx-10'>
          <Notecard
            title={"Do coding"}
            date={"24th aug"}
            tags={"#coding"}
            content={"Do coding daily atleast 1hr. Web dev and solve DSA questions from the stiver sheet"}
            isPinned={true}
            onDelete={() => { }}
            onEdit={() => { }}
            onPinNote={() => { }}
          />
          <Notecard
            title={"Do coding"}
            date={"24th aug"}
            tags={"#coding"}
            content={"Do coding daily atleast 1hr. Web dev and solve DSA questions from the stiver sheet"}
            isPinned={true}
            onDelete={() => { }}
            onEdit={() => { }}
            onPinNote={() => { }}
          />
        </div>

        <button className='w-16 h-16 flex items-center justify-center bg-primary rounded-full hover:bg-blue-600 fixed right-10 bottom-10 z-10' onClick={() => {}}>
          <MdAdd className='text-[32px] text-slate-100'/>
        </button>
      </div>
    </>
  )
}

export default Home